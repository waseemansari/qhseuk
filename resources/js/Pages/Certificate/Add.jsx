import React, { useState } from "react";
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';

export default function Add({ enrollment }) {
    
    const [exDate,setExdate]=useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({

        student_id:enrollment?.students?.id,
        course_id:enrollment?.course?.id,
        certificate_number: '',
        certificate_date: '',
        remarks: '',
        expiry: '',
        expiry_date: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('certificate.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                showNotification('Certificate Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Certificate  failed!', 'error', 3000);
            },
        });
    };
    const handleChange = (e) => {
        setData('expiry',e.target.value);
        
        if(e.target.value=='expiry_date'){
           setExdate(true);
        }else{
            setExdate(false);
        }
    };

   
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Certificate
                </h2>
            }
        >
            <Head title="Certificate" />
            <>
                <AddItemBreadCrums routeName="Certificate.create" name="Add Certificate" details="Add Certificate for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <input type="hidden" name="enroll_id" value={enrollment.id}/>
                                            <label htmlFor="name">Student number</label>
                                            <select className="form-control"  name="student_id">
                                                <option value={enrollment?.students?.id}>{enrollment?.students?.name+'- '+enrollment?.students?.student_number}</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="mobile">Mobile Number</label>
                                            <select className="form-control"  name="student_id">
                                                <option value={enrollment?.students?.whatsapp_number}>{enrollment?.students?.whatsapp_number}</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="mobile">Course</label>
                                            <select className="form-control"  name="student_id">
                                                <option value={enrollment?.course?.id}>{enrollment?.course?.name}</option>
                                            </select>
                                        </div>
                                       
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="certificate_number">Certificate number</label>
                                            <input
                                                id="certificate_number"
                                                type="text"
                                                name="certificate_number"
                                                value={data.certificate_number}
                                                className="form-control"
                                                onChange={(e) => setData('certificate_number', e.target.value)}
                                            />
                                            {errors.certificate_number && <div className="text-danger">{errors.certificate_number}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="certificate_date">Certificate date</label>
                                            <input
                                                id="certificate_date"
                                                type="date"
                                                name="certificate_date"
                                                value={data.certificate_date}
                                                className="form-control"
                                                onChange={(e) => setData('certificate_date', e.target.value)}
                                            />
                                            {errors.certificate_date && <div className="text-danger">{errors.certificate_date}</div>}

                                        </div>
                                       <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="mobile">Expiry</label>
                                            <select className="form-control"  name="expiry" onChange={handleChange}>
                                                <option value="">Select</option>
                                                <option value="long_life">long Life</option>
                                                <option value="expiry_date">Expiry Date</option>
                                            </select>
                                           {errors.expiry && <div className="text-danger">{errors.expiry}</div>}

                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                    
                                    {exDate && 
                                        <>
                                            <div className="col-lg-4 col-sm-6 ">
                                                <label htmlFor="expiry_date">Expiry Date</label>
                                                <input
                                                    id="expiry_date"
                                                    type="date"
                                                    rows={6}
                                                    name="expiry_date"
                                                    value={data.expiry_date}
                                                    className="form-control"
                                                    required
                                                    onChange={(e) => setData('expiry_date', e.target.value)}
                                                />
                                                {errors.expiry_date && <div className="text-danger">{errors.expiry_date}</div>}
                                            </div>
                                        </>
                                    }
                                        
                                   
                                        <div className="col-lg-8 col-sm-8">
                                            <label htmlFor="remarks">Remarks</label>
                                            <textarea
                                                id="remarks"
                                                type="text"
                                                rows={4}
                                                name="remarks"
                                                value={data.remarks}
                                                className="form-control"
                                                onChange={(e) => setData('remarks', e.target.value)}
                                            />
                                            {errors.remarks && <div className="text-danger">{errors.remarks}</div>}
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
