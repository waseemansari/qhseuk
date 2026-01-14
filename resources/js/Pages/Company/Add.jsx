import React, { useState } from "react";
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';

export default function Add({ countries }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        name:'',
        contact_person: '',
        contact_mobile: '',
        country: '',
        details: '',
        remarks: '',
        source: '',
        phone: '',
        website: '',
        contact_designation: '',
        contact_email: '',
        region: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('company.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Company Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Company  failed!', 'error', 3000);
            },
        });
    };
   
    const countriesOptions = countries.map(country => ({
        value: country.name,
        label: country.name
    }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Company
                </h2>
            }
        >
            <Head title="Company" />
            <>
                <AddItemBreadCrums routeName="Company.create" name="Add Company" details="Add Company for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>

                                    <div className="row ">
                                        
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="name">Company name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="form-control"
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="email">Company EMail</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="form-control"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="contact_person">Contact person name</label>
                                            <input
                                                id="contact_person"
                                                type="text"
                                                name="contact_person"
                                                value={data.contact_person}
                                                className="form-control"
                                                onChange={(e) => setData('contact_person', e.target.value)}
                                            />
                                            {errors.contact_person && <div className="text-danger">{errors.contact_person}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="contact_mobile">Contact person number</label>
                                            <input
                                                id="contact_mobile"
                                                type="number"
                                                name="contact_mobile"
                                                value={data.contact_mobile}
                                                className="form-control"
                                                onChange={(e) => setData('contact_mobile', e.target.value)}
                                            />
                                            {errors.contact_mobile && <div className="text-danger">{errors.contact_mobile}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="country">Country</label>
                                                <Select
                                                options={countriesOptions}
                                                value={countriesOptions.find(c => c.value === data.country)}
                                                onChange={(selected) => setData('country', selected?.value || '')}
                                                isSearchable={true}
                                                placeholder="Select country..."
                                            />
                                            {errors.country && <div className="text-danger">{errors.country}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="end_time">End Time</label>
                                            <input
                                                id="end_time"
                                                type="time"
                                                name="end_time"
                                                value={data.end_time}
                                                className="form-control"
                                                onChange={(e) => setData('end_time', e.target.value)}
                                            />
                                            {errors.end_time && <div className="text-danger">{errors.end_time}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="number_of_days">Number of days</label>
                                            <input
                                                id="number_of_days"
                                                type="numner"
                                                name="number_of_days"

                                                value={data.number_of_days}
                                                className="form-control"
                                                onChange={(e) => setData('number_of_days', e.target.value)}
                                            />
                                            {errors.number_of_days && <div className="text-danger">{errors.number_of_days}</div>}
                                        </div>
                                     
                                       <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="source">Source</label>
                                            <input
                                                id="source"
                                                type="text"
                                                name="source"
                                                value={data.source}
                                                className="form-control"
                                                onChange={(e) => setData('source', e.target.value)}
                                            />
                                            {errors.source && <div className="text-danger">{errors.source}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="region">Region</label>
                                            <input
                                                id="region"
                                                type="text"
                                                name="region"
                                                value={data.region}
                                                className="form-control"
                                                onChange={(e) => setData('region', e.target.value)}
                                            />
                                            {errors.region && <div className="text-danger">{errors.region}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="phone">Company phone number</label>
                                            <input
                                                id="phone"
                                                type="number"
                                                name="phone"
                                                value={data.phone}
                                                className="form-control"
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="website">Company website</label>
                                            <input
                                                id="website"
                                                type="text"
                                                name="website"
                                                value={data.website}
                                                className="form-control"
                                                onChange={(e) => setData('website', e.target.value)}
                                            />
                                            {errors.website && <div className="text-danger">{errors.website}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="contact_designation">Contact person designation</label>
                                            <input
                                                id="contact_designation"
                                                type="text"
                                                name="contact_designation"
                                                value={data.contact_designation}
                                                className="form-control"
                                                onChange={(e) => setData('contact_designation', e.target.value)}
                                            />
                                            {errors.contact_designation && <div className="text-danger">{errors.contact_designation}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="contact_email">Contact person email</label>
                                            <input
                                                id="contact_email"
                                                type="text"
                                                name="contact_email"
                                                value={data.contact_email}
                                                className="form-control"
                                                onChange={(e) => setData('contact_email', e.target.value)}
                                            />
                                            {errors.contact_email && <div className="text-danger">{errors.contact_email}</div>}
                                        </div>
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="details">Details</label>
                                            <textarea
                                                id="details"
                                                rows={6}
                                                name="details"
                                                value={data.details}
                                                className="form-control"
                                                onChange={(e) => setData('details', e.target.value)}
                                            />
                                            {errors.details && <div className="text-danger">{errors.details}</div>}
                                        </div>
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="remarks">Remarks</label>
                                            <textarea
                                                id="remarks"
                                                rows={6}
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
