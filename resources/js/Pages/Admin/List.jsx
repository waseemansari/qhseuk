import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import UserTableCard from "./UserTableCard";

export default function List({ users }) {
    const headers = [
        { label: "UINO", key: "id" },
        { label: "Full name", key: "name" },
        { label: "EMail", key: "email" },
        { label: "Mobile No", key: "phone" },
        { label: "Designation", key: "designation" },
        { label: "Created by", key: "created_by" },
        { label: "Branch", key: "branch_id" },
        { label: "Role", key: "role_id" },
        { label: "Status", key: "status" },


    ];


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User management
                </h2>
            }
        >
            <Head title="User management" />
            <>
                <BreadCrums routeName="user-management.index" name="user-management" permission="user management" />

                <UserTableCard title="user-management" headers={headers} data={users} />
            </>

        </AuthenticatedLayout>
    );
}
