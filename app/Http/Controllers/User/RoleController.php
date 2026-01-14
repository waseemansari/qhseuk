<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Auth;

use App\Models\{User,Role,Permission };
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
     
         $roles = Role::paginate(20)->withQueryString();

        return Inertia::render('Role/List', [
            'roles' => $roles,
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
        return Inertia::render('Role/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
        ]);
        $validated['guard_name']='web';
        Role::create($validated);
        
        return redirect()->route('role.index')->with('success', 'Role added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {   
         return Inertia::render('Role/AssignPermissions', [
            'roles' => Role::whereId($id)->select('id', 'name')->get(),
            'permissions' => Permission::select('id', 'name')->orderBy('name','asc')->get(),
            'rolePermissions' => Role::with('permissions:id,name')->get()
                ->mapWithKeys(fn($role) => [
                    $role->id => $role->permissions->pluck('id')
                ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::findorfail($id);
        return Inertia::render('Role/Edit', [
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::findorfail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $role->update($validated);
       
        return redirect()->route('role.index')->with('success', 'Role Updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(string $id)
    {
         $role = Role::findorfail($id);
       
        
        $role->delete();
        return redirect()->back()->with('success', 'Role  deleted successfully!');
    }

    public function AsignPermission(Request $request, Role $role)
    {
        
        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->syncPermissions($request->permissions);

        return back()->with('success', 'Permissions updated successfully!');
    }
}
