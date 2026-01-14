import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import TableCardCertificate from "./TableCardCertificate";

export default function FollowUpList({ certificates }) {
    
 const headers = [
  { label: "SINO", key: "id" },
  { label: "student_number", key: "student_number" },
  { label: "Full name", key: "name" },
  { label: "Mobile No", key: "mobile" },
  { label: "email", key: "email" },
  { label: "whatsapp_number", key: "whatsapp_number" },
  { label: "course", key: "course_id" },
  { label: "certificate_number", key: "certificate_number" },
  { label: "certificate_date", key: "certificate_date" },
  { label: "remarks", key: "remarks" },
  { label: "expiry", key: "expiry" },
  { label: "expiry_date", key: "expiry_date" },
  { label: "status", key: "status" },
  { label: "reason_of_return", key: "reason_of_return" },
  { label: "receiver_name", key: "receiver_name" },
  { label: "attach_receiver_id", key: "attach_receiver_id" },
  { label: "created_at", key: "created_at" },
  { label: "branch_id", key: "branch_id" },
  
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Certificate Follow Up
                </h2>
            }
        >
            <Head title="Certificate Follow Up" />
            <>
                <BreadCrums routeName="certificate.certificate-follow-up" name="Certificate Follow Up"  />
                
                <TableCardCertificate title="Certificate Follow Up" headers={headers} data={certificates} />
            </>

        </AuthenticatedLayout>
    );
}
