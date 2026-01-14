import React, { useState } from "react";
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';

export default function Edit({ certificate }) {

    const [exDate, setExdate] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: certificate?.students?.id,
        course_id: certificate?.course?.id,
        certificate_status: '',
        return_reason:'',
        certificate_number: '',
        certificate_date: '',
        remarks: '',
        expiry: '',
        expiry_date: '',
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('certificate.update', certificate.id), {
            _method: 'put',
            forceFormData: true, // important for file uploads
            preserveScroll: true,
            onSuccess: () => {
                showNotification('certificate updated successfully!', 'success', 3000);
            },
            onError: () => {
                showNotification('Failed to update certificate.', 'error', 3000);
            },
        });
    };
    const handleChange = (e) => {
        setData('certificate_status', e.target.value)
        const { name, value } = e.target;
        setData(name, value);
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
                                            <input type="hidden" name="enroll_id" value={certificate.id} />
                                            <label htmlFor="name">Student number</label>
                                            <select className="form-control" name="student_id">
                                                <option value={certificate?.student?.id}>{certificate?.student?.name + '- ' + certificate?.student?.student_number}</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="mobile">Mobile Number</label>
                                            <select className="form-control" name="student_id">
                                                <option value={certificate?.student?.whatsapp_number}>{certificate?.student?.whatsapp_number}</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="mobile">Course</label>
                                            <select className="form-control" name="student_id">
                                                <option value={certificate?.course?.id}>{certificate?.course?.name}</option>
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
                                                value={certificate?.certificate_number}
                                                readOnly={true}
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
                                                value={certificate?.certificate_date}
                                                readOnly={true}
                                                className="form-control"
                                                onChange={(e) => setData('certificate_date', e.target.value)}
                                            />
                                            {errors.certificate_date && <div className="text-danger">{errors.certificate_date}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="mobile">Expiry</label>
                                            <select className="form-control" readOnly={true} name="expiry" value={certificate?.expiry || ""}>
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
                                                        readOnly={true}
                                                        required
                                                        onChange={(e) => setData('expiry_date', e.target.value)}
                                                    />
                                                    {errors.expiry_date && <div className="text-danger">{errors.expiry_date}</div>}
                                                </div>
                                            </>
                                        }
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="remarks">Remarks</label>
                                            <textarea
                                                id="remarks"
                                                type="text"
                                                rows={4}
                                                name="remarks"
                                                value={certificate?.remarks}
                                                readOnly={true}
                                                className="form-control"
                                                onChange={(e) => setData('remarks', e.target.value)}
                                            />
                                            {errors.remarks && <div className="text-danger">{errors.remarks}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="certificate_status">Status</label>
                                            <select className="form-control" name="certificate_status" onChange={handleChange} required>
                                                <option value="">select</option>
                                                <option value="Collected">Collected</option>
                                                <option value="Returned">Returned</option>
                                                <option value="Courier">Courier </option>
                                                <option value="Send Scaned Copy">Send Scaned Copy</option>
                                            </select>
                                            {errors.certificate_status && <div className="text-danger">{errors.certificate_status}</div>}

                                        </div>
                                        
                                            {data.certificate_status === "Collected" && (
                                                <>
                                                    <div className="col-lg-4 col-sm-6 ">
                                                    <label htmlFor="certificate_status">Collected By</label>
                                                    <select className="form-control" name="collected_by" value={data.collected_by}
                                                         onChange={(e) => setData('collected_by', e.target.value)} required>
                                                        <option value="">Collected By</option>
                                                        <option value="self">self</option>
                                                        <option value="others">Others</option>
                                                        
                                                    </select>
                                                    </div>
                                                    <div className="col-lg-4 col-sm-6 ">
                                                    <label htmlFor="certificate_status">Receiver Name</label>
                                                    <input
                                                        type="text"
                                                        name="receiver_name"
                                                        placeholder="Receiver Name"
                                                        className="form-control mb-2"
                                                        value={data.receiver_name}
                                                        onChange={(e) => setData('receiver_name', e.target.value)}
                                                    />
                                                    </div>
                                                </>
                                            )}
                                        <div className="col-lg-4 col-sm-6 mt-3">
                                            {/* ✅ Returned */}
                                            {data.certificate_status === "Returned" && (
                                                <div className="mt-3">
                                                    <textarea
                                                        name="return_reason"
                                                        placeholder="Reason for Return"
                                                        className="form-control mb-2"
                                                        value={data.return_reason}
                                                        onChange={(e) => setData('return_reason', e.target.value)}
                                                    />
                                                </div>
                                            )}

                                            {/* ✅ Courier */}
                                            {data.certificate_status === "Courier" && (
                                                <div className="mt-3">
                                                    <input
                                                        type="text"
                                                        name="courier_company"
                                                        placeholder="Courier Company"
                                                        className="form-control mb-2"
                                                        value={data.courier_company}
                                                        onChange={(e) => setData('courier_company', e.target.value)}
                                                    />
                                                    
                                                </div>
                                            )}

                                            
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
