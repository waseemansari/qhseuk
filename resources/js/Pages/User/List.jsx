import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import TableCardStudent from "@/Components/TableCardStudent";

export default function List({ students }) {
 const headers = [
  { label: "SINO", key: "id" },
   { label: "Student No", key: "student_number" },
  { label: "Full name", key: "name" },
  { label: "Mobile No", key: "mobile" },
  { label: "whatsapp_number", key: "whatsapp_number" },
  { label: "email", key: "email" },
  { label: "gender", key: "gender" },
  { label: "date_of_birth", key: "date_of_birth" },
  { label: "address", key: "address" },
  { label: "company name", key: "company" },
  { label: "job_position", key: "job_position" },
  { label: "course", key: "course_id" },
  { label: "study mode", key: "study_mode" },
  { label: "nationality", key: "nationality" },
  { label: "country", key: "country" },
  { label: "region", key: "region" },
  { label: "language", key: "language" },
  { label: "remarks", key: "remarks" },
  { label: "contact_person", key: "contact_person" },
  { label: "registration_date", key: "registration_date" },
  { label: "enroll_status", key: "enroll_status" },
  { label: "whatsapp_group", key: "whatsapp_group" },
  
  { label: "student_status", key: "student_status" },
  { label: "follow_up_date", key: "follow_up_date" },
  { label: "Message", key: "follow_up_msg" },
  { label: "Attachement Id", key: "attachment" },
  { label: "created_by", key: "created_by" },
 
  
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student
                </h2>
            }
        >
            <Head title="Student" />
            <>
                <BreadCrums routeName="student.index" name="Student"  permission="student info create"/>
                
                <TableCardStudent title="Student" headers={headers} data={students} permi={["student info edit","student info delete"]} />
            </>

        </AuthenticatedLayout>
    );
}
