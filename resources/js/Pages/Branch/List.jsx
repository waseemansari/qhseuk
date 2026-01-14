import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import BranchCard from "./BranchCard";

export default function BranchList({ branches }) {
 const headers = [
  { label: "ID", key: "id" },
  { label: "Branch Name", key: "name" },
  { label: "code", key: "code" },
  { label: "type", key: "type" },
  { label: "country", key: "country" },
  { label: "city", key: "city" },
  { label: "address", key: "address" },
  { label: "contanct_no", key: "contanct_no" },
  { label: "email", key: "email" },
  { label: "logo", key: "logo" },
  { label: "national_tax", key: "national_tax" },
  { label: "sale_tax", key: "sale_tax" },
  { label: "status", key: "status" },
  { label: "currency", key: "currency" },

  { label: "Created At", key: "created_at" },
  
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Branch
                </h2>
            }
        >
            <Head title="Branch" />
            <>
                <BreadCrums routeName="branch.index" name="Branch"   permission="branch create"/>
                
                <BranchCard title="Branch" headers={headers} data={branches} />
            </>

        </AuthenticatedLayout>
    );
}
