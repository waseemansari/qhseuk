import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import PaymentHeader from "./PaymentHeader";
import PaymentTableCard from "./PaymentTableCard";

export default function List({ results,payments }) {
 const headers = [
  { label: "PYNO", key: "id" },
   { label: "invoice_number", key: "invoice_number" },
  { label: "Student name", key: "name" },
  { label: "Student number", key: "student_number" },
  { label: "Student email", key: "email" },
  { label: "whatsapp_number", key: "whatsapp_number" },
  { label: "description", key: "description" },
  { label: "study_mode", key: "study_mode" },
  { label: "course", key: "course_id" },
  { label: "course_fee", key: "course_fee" },
  { label: "Tax", key: "tax" },  
  { label: "discount", key: "discount" },
  { label: "Total", key: "amount" },
  { label: "Balance", key: "bln" },
  { label: "Percentage", key: "Percentage" },
  { label: "due_date", key: "due_date" },
  { label: "payment_method", key: "payment_method" },
  { label: "payment_status", key: "payment_status" },
  { label: "bank title", key: "bank_id" }, 
  { label: "Invoice date", key: "created_at" },
  { label: "contact_person", key: "contact_person" },
  { label: "exam_date", key: "exam_date" },
  { label: "category", key: "category" },
  { label: "Attachment", key: "attachment" },
];

  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student payment
                </h2>
            }
        >  
            <Head title="Student payment" />
            <>
                <PaymentHeader routeName="payment.index" name="Student payment" result={results}/>
                 
                <PaymentTableCard title="Student payment" headers={headers} data={payments} />
            </>

        </AuthenticatedLayout>
    );
}
