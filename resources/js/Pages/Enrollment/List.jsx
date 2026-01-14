import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import EnrollHeader from "./EnrollHeader";
import TableCardEnrollment from "./TableCardEnrollment";

export default function List({ courses,enrollments,batchs }) {
 const headers = [
  { label: "SINO", key: "id" },
   { label: "Student No", key: "student_number" },
  { label: "Full name", key: "name" },
  { label: "Mobile No", key: "mobile" },
  { label: "whatsapp_number", key: "whatsapp_number" },
  { label: "email", key: "email" },
  { label: "course", key: "course_id" },
  { label: "course fee", key: "course_fee" },
  { label: "Balance", key: "bln" },
  { label: "status", key: "status_fee" },
  { label: "Enroll Date", key: "enrollment_date" },  
  { label: "contact_person", key: "contact_person" },

];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Enrollment
                </h2>
            }
        >  
            <Head title="Enrollment" />
            <>
                <EnrollHeader routeName="enrollment.index" name="Enrollment" data={courses} batchs={batchs}/>
                
                <TableCardEnrollment title="Enrollment" headers={headers} data={enrollments} />
            </>

        </AuthenticatedLayout>
    );
}
