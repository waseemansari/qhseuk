import React, { useState } from 'react';
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';

export default function Add({ id,invoiceNumber, students,banks }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        invoice_number: invoiceNumber,
        student_id: '',
        course_id: '',
        course_fee: '',
        bln: '',
        due_date: '',
        description: '',
        tax: '',
        discount: null,
        amount: '',
        amount_paid: '',
        payment_method: '',
        status: '',
        received_by: '',
        bank_id: null,
        exam_date: '',
        category: 'New-Learner',
        payment_details: '',
        attachment:null,
        enroll_id:'',
        url_id: id ?? 0,

    });
   
    const submit = (e) => {
        e.preventDefault();
        post(route('payment.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Payment Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Payment  failed!', 'error', 3000);
            },
        });
    };
    const [courseOptions, setCourseOptions] = useState([]);

    // Student dropdown options
    const studentOptions = students.map(student => ({
        value: student.id,
        label: `${student.name} - ${student.whatsapp_number}`
    }));

    
    const handleStudentChange = async (selected) => {
        const studentId = selected?.value || '';
        setData('student_id', studentId);
        setData('course_id', ''); // clear selected course
        setCourseOptions([]); // reset
         if(id==null){
            id=0;
         }
        if (studentId) {
            try {
                const response = await axios.get(`/student-payment/${studentId}/${id}/courses`);
                const fetchedCourses = response.data.map(course => ({
                    value: course.id,
                    label: course.name,
                    fee: course.course_fee,
                    bln: course.bln,
                    enroll_id: course.enroll_id,
                }));
                setCourseOptions(fetchedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
    };

    // Handle course change
    const [courseFee, setCourseFee] = useState([]);
    const [bln, setBln] = useState([]);
    const [amount, setAmount] = useState([]);
    const [showBank, setShowBank] = useState(false);
    const [taxType, setTaxType] = useState(0);
    const handleCourseChange = (selected) => {
        setData('course_id', selected?.value || '');
        setData('enroll_id', selected?.enroll_id || '');        
        setCourseFee(selected?.fee);
        setBln(selected?.bln);
    };
    
    const handleTaxTypeChange = (e) => {
        setData('tax_status', e.target.value)
        if(e.target.value=='no_vat'){
           setTaxType(0);
        }
        else{
           setTaxType(10); 
        }
        setData('tax', taxType);
        
    };
    const handleAmountChange = (e) => {
        setData('amount', e.target.value);
        if(taxType > 0 ){
          setData('amount_paid', e.target.value+taxType)
        }else{
            setData('amount_paid', e.target.value)
        }
        
        setAmount(e.target.value);
        setData('tax', taxType);
    };                                       
    const handleMethodChange = (e) => {  

        setData('payment_method', e.target.value || '');
        if( e.target.value=='bank-transfer'){
           setShowBank(true)
           
        }
        else{
            setShowBank(false)
            setData('bank_id', null);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Student Payment
                </h2>
            }
        >
            <Head title="Create Student Payment" />
            <>
                <AddItemBreadCrums routeName="payment.create" name="Create Student Payment" details="Add Create Student Payment for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="row ">
                                        
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="invoice_number">Invoice No</label>
                                            <input
                                                id="invoice_number"
                                                defaultValue={invoiceNumber}
                                                className="form-control"
                                                readOnly={true}
                                            />
                                            {errors.invoice_number && <div className="text-danger">{errors.invoice_number}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="student_id">Student Name</label>
                                            <Select
                                                options={studentOptions}
                                                value={studentOptions.find(c => c.value === data.student_id)}
                                                onChange={handleStudentChange}
                                                placeholder="Select Student..."
                                            />
                                            {errors.student_id && <div className="text-danger">{errors.student_id}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="course_id">Course Name</label>
                                            <Select
                                                options={courseOptions}
                                                value={courseOptions.find(c => c.value === data.course_id)}
                                                onChange={handleCourseChange}
                                                placeholder="Select Course..."
                                            />

                                            {errors.course_id && <div className="text-danger">{errors.course_id}</div>}
                                        </div>

                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="course_fee">Course fee</label>
                                            <input
                                                id="course_fee"
                                                type="number"
                                                name="course_fee"
                                                defaultValue={courseFee}
                                                readOnly={true}
                                                className="form-control"
                                                onChange={(e) => setData('course_fee', e.target.value)}
                                            />
                                            {errors.course_fee && <div className="text-danger">{errors.course_fee}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="course_fee">Balance</label>
                                            <input
                                                id="balance"
                                                type="number"
                                                name="bln"
                                                defaultValue={bln}
                                                readOnly={true}
                                                className="form-control"
                                                onChange={(e) => setData('bln', e.target.value)}
                                            />
                                            {errors.bln && <div className="text-danger">{errors.bln}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="due_date">Due Date</label>
                                            <input
                                                id="due_date"
                                                type="date"
                                                name="due_date"
                                                className="form-control"
                                                onChange={(e) => setData('due_date', e.target.value)}
                                            />
                                            {errors.due_date && <div className="text-danger">{errors.due_date}</div>}

                                        </div>
                                        <div className="col-lg-8 col-sm-8">
                                            <label htmlFor="region">Description</label>
                                            <input
                                                id="description"
                                                type="text"
                                                name="description"
                                                className="form-control"
                                                onChange={(e) => setData('description', e.target.value)}
                                            />
                                            {errors.description && <div className="text-danger">{errors.description}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="tax_status">Tax Status</label>
                                            <select
                                                id="tax_status"
                                                name="tax_status"
                                                className="form-control"
                                                onChange={handleTaxTypeChange}
                                            >
                                                <option value="no_vat">No Vat</option>
                                                <option value="vat">Vat</option>

                                            </select>
                                            {errors.tax_status && <div className="text-danger">{errors.tax_status}</div>}

                                        </div>

                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="tax">Tax</label>
                                            <input
                                                id="tax"
                                                type="number"
                                                name="tax"
                                                defaultValue={taxType}
                                                readOnly={true}
                                                className="form-control"
                                            />
                                            {errors.tax && <div className="text-danger">{errors.tax}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="course_fee">Discount</label>
                                            <input
                                                id="discount"
                                                type="number"
                                                name="discount"
                                                className="form-control"
                                                onChange={(e) => setData('discount', e.target.value)}
                                            />
                                            {errors.discount && <div className="text-danger">{errors.discount}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="course_fee">Total</label>
                                            <input
                                                id="amount"
                                                type="number"
                                                name="amount"
                                                className="form-control"
                                                onChange={handleAmountChange}
                                            />
                                            {errors.amount && <div className="text-danger">{errors.amount}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="amount_paid">Payment</label>
                                            <input
                                                id="amount_paid"
                                                type="text"
                                                readOnly={true}
                                                value={amount}
                                                name="amount_paid"
                                                className="form-control"
                                                
                                            />
                                            {errors.amount_paid && <div className="text-danger">{errors.amount_paid}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="payment_method">Method</label>
                                            <select
                                                id="payment_method"
                                                name="payment_method"
                                                className="form-control"
                                                onChange={handleMethodChange}
                                            >
                                                <option value="">Select Method </option>
                                                <option value="cash">Cash </option>
                                                <option value="cheque">Cheque </option>
                                                <option value="credit-card">Credit Card</option>
                                                <option value="debit-card">Debit Card</option>
                                                <option value="bank-transfer">Bank Transfer</option>
                                            </select>
                                            {errors.payment_method && <div className="text-danger">{errors.payment_method}</div>}
                                        </div>
                                        {showBank && 
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="bank_id">Account</label>
                                            <select
                                                id="bank_id"
                                                name="bank_id"
                                                className="form-control"
                                                onChange={(e) => setData('bank_id', e.target.value)}
                                            >
                                                 <option value="">Select Bank</option>
                                                {banks.map((bank) => (
                                                    <option key={bank.id} value={bank.id}>
                                                        {bank.title}
                                                    </option>
                                                ))}
                                            </select>
                                            
                                            {errors.bank_id && <div className="text-danger">{errors.bank_id}</div>}

                                        </div>
                                        }
                                    
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="exam_date">Exam date</label>
                                            <input
                                                id="exam_date"
                                                type="date"
                                                name="exam_date"
                                                defaultValue={data.exam_date}
                                               
                                                className="form-control"
                                                onChange={(e) => setData('exam_date', e.target.value)}
                                            />
                                            {errors.exam_date && <div className="text-danger">{errors.exam_date}</div>}

                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="category">Category</label>
                                            <select
                                                id="category"
                                                name="category"
                                                value={data.category}
                                                className="form-control"
                                                onChange={(e) => setData('category', e.target.value)}
                                            >
                                                <option value="New-Learner">New Learner</option>
                                                <option value="Resit&nbsp;Learner">Resit Learner</option>
                                            </select>
                                            {errors.category && <div className="text-danger">{errors.category}</div>}
                                        </div>
                                       <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="receipt">Upload Receipt</label>
                                            <input
                                                id="receipt"
                                                type="file"
                                                name="receipt"
                                                defaultValue={data.receipt}
                                               
                                                className="form-control"
                                                onChange={(e) => setData('attachment', e.target.files[0])}
                                            />
                                            {errors.attachment && <div className="text-danger">{errors.attachment}</div>}

                                        </div>

                                    </div>

                                    <div className="text-end mt-3">
                                        <button className="btn btn-primary" type="submit" disabled={processing}>
                                            Submit
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
