<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Auth;
use Hash;
use Mail;
use App\Mail\WelcomeUserMail;

use App\Models\{User,Role,Branch };

class UserContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
      
         $users = User::with(['roles','branch','user'])->where('branch_id', $branchId)
        ->when($request->search, fn($q, $search) =>
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('designation', 'like', "%{$search}%")
                        ->orWhere('branch_id', 'like', "%{$search}%")
                       
            )
          ->when($request->status, fn($q, $status) =>
                $q->where('status', $status)
            )
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/List', [
            'users' => $users,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::get(['id','name']);
        $branches = Branch::get(['id','name']);
        return Inertia::render('Admin/Add', [
            'roles' => $roles,
            'branches' => $branches,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $passowrd  = config('custom.password');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email'=> 'required|email|string|max:255|unique:users,email',
            'phone'=> 'required|string|max:255|unique:users,phone',
            'designation' => 'required|string|max:255',
            'role_id' => 'required|max:255',
        ]);

        if ($request->hasFile('attachment')) {
            $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'user', 200, 200);
            $validated['attachment'] = $url;
        }
        
        unset($validated['role_id']);
        $validated['password']=Hash::make($passowrd);
        if($request->branch_id){
            $validated['branch_id']=$request->branch_id;
        }
        $user = User::create($validated);
        if($user){
            $user->assignRole($request->role_id);
            Mail::to($user->email)->send(new WelcomeUserMail($user,$passowrd));
        }

        return redirect()->route('user-management.index')->with('success', 'User added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findorfail($id);
        $roles = Role::get(['id','name']);
        return Inertia::render('Admin/Edit', [
            'roles' => $roles,
            'user'=>$user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findorfail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email'=> "required|email|string|max:255|unique:users,email,{$user->id}",
            'phone'=> "required|string|max:255|unique:users,phone,{$user->id}",
            'designation' => 'required|string|max:255',
            'role_id' => 'required|max:255',
        ]);

        if ($request->hasFile('attachment')) {
            $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'user', 200, 200);
            $validated['attachment'] = $url;
        }
        
        unset($validated['role_id']);
        $user->update($validated);
       
        return redirect()->route('user-management.index')->with('success', 'User Updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findorfail($id);
        if (!empty($user->attachment) && Storage::disk('spaces')->exists($user->attachment)) {
            Storage::disk('spaces')->delete($user->attachment);
        }
        
        $user->delete();
        return redirect()->back()->with('success', 'User and attachment deleted successfully!');
    }
}
