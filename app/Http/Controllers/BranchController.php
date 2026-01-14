<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\ImageUploadHelper;
use DB;
use Illuminate\Support\Facades\Storage;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branch = Branch::query()
            ->orderBy('id', 'DESC')
            ->paginate(25)
            ->withQueryString(); 

        return Inertia::render('Branch/List', [
            'branches' => $branch,
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

        $countries = DB::table('countries')->get();

        return Inertia::render('Branch/Add', [
            'countries' => $countries,
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email'=> 'required|email|string|max:255|unique:users,email',
            'code'=> 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city' => 'required|max:255',
            'address' => 'required|max:255',
            'contanct_no' => 'required|max:255',
            'national_tax' => 'required|max:255',
            'sale_tax' => 'required|max:255',
            'currency' => 'required|max:255',
            'logo' => 'nullable|file|mimes:png,jpg,jpeg|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $url = ImageUploadHelper::uploadAndResize($request->file('logo'), 'branch', 300, 300);
            $validated['logo'] = $url;
        }
        
        Branch::create($validated);
    
        return redirect()->route('branch.index')->with('success', 'Branch added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        
        $countries = DB::table('countries')->get();
        return Inertia::render('Branch/Edit', [
            'countries' => $countries,
            'branch'=>$branch
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Branch $branch)
    {
    
          $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email'=> 'required|email|string|max:255|unique:users,email',
            'code'=> 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city' => 'required|max:255',
            'address' => 'required|max:255',
            'contanct_no' => 'required|max:255',
            'national_tax' => 'required|max:255',
            'sale_tax' => 'required|max:255',
            'currency' => 'required|max:255',
            'logo' => 'nullable|file|mimes:png,jpg,jpeg|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $url = ImageUploadHelper::uploadAndResize($request->file('logo'), 'branch', 300, 300);
            $validated['logo'] = $url;
        }
        else {
            $validated['logo'] = $branch->logo;
        }
        $branch->update($validated);
    
        return redirect()->route('branch.index')->with('success', 'Branch added successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
         
        if (!empty($branch->attachment) && Storage::disk('spaces')->exists($branch->attachment)) {
            Storage::disk('spaces')->delete($branch->attachment);
        }
        $branch->delete();
        return redirect()->back()->with('success', 'Branch and attachment deleted successfully!');
        
    }
}
