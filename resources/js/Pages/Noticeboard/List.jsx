import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import TableCard from "./TableCard";

export default function List({ noticeboards }) {
    
 const headers = [
  { label: "SINO", key: "id" },
  { label: "name", key: "name" },
  { label: "description", key: "description" },
  { label: "created_by", key: "created_by" },
  { label: "branch_id", key: "branch_id" },
  { label: "status", key: "status" },
  { label: "created_at", key: "created_at" },
 
  
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Noticeboard
                </h2>
            }
        >
            <Head title="Noticeboard" />
            <>
                <BreadCrums routeName="noticeboard.index" name="Noticeboard"  />
                
                <TableCard title="Noticeboard" headers={headers} data={noticeboards} />
            </>

        </AuthenticatedLayout>
    );
}
