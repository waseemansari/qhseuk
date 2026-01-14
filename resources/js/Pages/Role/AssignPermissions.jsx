import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AssignPermissions({ roles, permissions, rolePermissions }) {

    const [selectedRole, setSelectedRole] = useState(roles[0]?.id || null);
    const [selectedPermissions, setSelectedPermissions] = useState(
        rolePermissions[selectedRole] || []
    );

    const handleRoleChange = (id) => {
        setSelectedRole(id);
        setSelectedPermissions(rolePermissions[id] || []);
    };

    const togglePermission = (permissionId) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionId)
                ? prev.filter((p) => p !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSubmit = () => {
        router.post(`/asign-permission/${selectedRole}`, {
            permissions: selectedPermissions
        });
    };

    return (
          <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Role
                        </h2>
                    }
                >
                    <>
                        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Permissions to Role</h2>

            {/* Role Select */}
            <div className="mb-4">
                <label className="font-medium">Select Role</label>
                <select
                    className="form-control mt-2 border p-2"
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                >
                    {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Permission Checkboxes */}
            <div className="grid grid-cols-2 gap-3">
                {permissions.map((permission) => (
                    <label
                        key={permission.id}
                        className="flex items-center gap-2 border p-2 rounded"
                    >
                        <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                        />
                          <span className="p-2">{permission.name}</span>
                    </label>
                ))}
            </div>

            
            <div className="text-end mt-3">
                <button  onClick={handleSubmit} className="btn btn-primary" type="submit" >
                    Asign
                </button>
            </div>
        </div>
                    </>
                </AuthenticatedLayout>
        
    );
}
