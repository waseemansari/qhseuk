import React, { useState } from "react";
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';

export default function Edit({ noticeboard}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name:noticeboard?.name,
        description: noticeboard?.description,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('noticeboard.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Noticeboard Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Noticeboard  failed!', 'error', 3000);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Noticeboard
                </h2>
            }
        >
            <Head title="Noticeboard" />
            <>
                <AddItemBreadCrums routeName="noticeboard.create" name="Add Noticeboard" details="Add Noticeboard for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>

                                    <div className="row ">
                                        
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="name">Noticeboard name</label>
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
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                rows={6}
                                                name="description"

                                                value={data.description}
                                                className="form-control"
                                                onChange={(e) => setData('description', e.target.value)}
                                            />
                                            {errors.description && <div className="text-danger">{errors.description}</div>}
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
