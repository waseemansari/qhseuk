import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import TableCardCompany from "./TableCardCompany";

export default function List({ companies }) {
 const headers = [
  { label: "ID", key: "id" },
  { label: "company_number", key: "company_number" },
  { label: "name", key: "name" },
  { label: "trn_number", key: "company_number" },
  { label: "email", key: "email" },
  { label: "phone", key: "phone" },
  { label: "website", key: "website" },
  { label: "contact_person", key: "contact_person" },
  { label: "contact_mobile", key: "contact_mobile" },
  { label: "contact_email", key: "contact_email" },
  { label: "contact_designation", key: "contact_designation" },
  { label: "country", key: "country" },
  { label: "region", key: "region" },
  { label: "details", key: "details" },
  { label: "remarks", key: "remarks" },

  { label: "source", key: "source" },
  { label: "status", key: "status" },
  { label: "action_date", key: "action_date" },
  { label: "action_notes", key: "action_notes" },
  { label: "created_by", key: "created_by" },
  { label: "branch_id", key: "branch_id" },
  { label: "created_at", key: "created_at" },

];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Company
                </h2>
            }
        >
            <Head title="Company" />
            <>
              
                <BreadCrums routeName="company.index" name="Company" data={companies} permission="company create"/>
                 
                <TableCardCompany title="Company" headers={headers} data={companies}   />
            </>

        </AuthenticatedLayout>
    );
}
