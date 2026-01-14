import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import TableCard from "@/Components/TableCard";

export default function CourseList({ courses }) {
 const headers = [
  { label: "ID", key: "id" },
  { label: "Course Name", key: "name" },
  { label: "Accreditation Body", key: "name_numeric" },
  { label: "Status", key: "status" },
  { label: "Attachement", key: "attachment" },
  { label: "Desc", key: "description" },
  { label: "Branch", key: "branch_id" },
  { label: "Created At", key: "created_at" },
  
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Course
                </h2>
            }
        >
            <Head title="Course" />
            <>
                <BreadCrums routeName="course.index" name="Course"  permission="course create" />
                
                <TableCard title="Course" headers={headers} data={courses} />
            </>

        </AuthenticatedLayout>
    );
}
