import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import TableCard from "@/Components/TableCard";
import EnrollHeader from "../Enrollment/EnrollHeader";

export default function List({ sections ,courses,batchs}) {
 const headers = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "nick_name", key: "nick_name" },
  { label: "Course", key: "course_id" },
  { label: "start_date", key: "start_date" },
  { label: "end_date", key: "end_date" },
  { label: "start_time", key: "start_time" },
  { label: "end_time", key: "end_time" },
  { label: "number_of_days", key: "number_of_days" },
  
    
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Batch
                </h2>
            }
        >
            <Head title="Batch" />
            <>
              
                <EnrollHeader routeName="batch.index" name="Batch" data={courses} batchs={batchs}/>
                 
                <TableCard title="Batch" headers={headers} data={sections} />
            </>

        </AuthenticatedLayout>
    );
}
