import React, { useState } from "react";
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';

export default function Add({ courses,users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        teacher_id: '',
        name:'',
        nick_name: '',
        course_id: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        number_of_days: '',
        week_days: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('batch.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Batch Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Batch  failed!', 'error', 3000);
            },
        });
    };
    const courseOptions = courses.map(course => ({
        value: course.id,
        label: course.name
    }));
    const userOptions = users.map(user => ({
        value: user.id,
        label: user.name
    }));

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
                <AddItemBreadCrums routeName="Batch.create" name="Add Batch" details="Add Batch for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>

                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="course_id">Course Name</label>

                                            <Select
                                                options={courseOptions}
                                                value={courseOptions.find(c => c.value === data.course_id)}
                                                onChange={(selected) => setData('course_id', selected?.value || '')}
                                                isSearchable={true}
                                                placeholder="Select Course..."
                                            />
                                            {errors.course_id && <div className="text-danger">{errors.course_id}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="name">Batch name</label>
                                            <input
                                                id="namae"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="form-control"
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="start_date">Start date</label>
                                            <input
                                                id="start_date"
                                                type="date"
                                                name="start_date"
                                                value={data.start_date}
                                                className="form-control"
                                                onChange={(e) => setData('start_date', e.target.value)}
                                            />
                                            {errors.start_date && <div className="text-danger">{errors.start_date}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="end_date">End date</label>
                                            <input
                                                id="end_date"
                                                type="date"
                                                name="end_date"
                                                value={data.end_date}
                                                className="form-control"
                                                onChange={(e) => setData('end_date', e.target.value)}
                                            />
                                            {errors.end_date && <div className="text-danger">{errors.end_date}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="start_date">Start Time</label>
                                            <input
                                                id="start_time"
                                                type="time"
                                                name="start_time"
                                                value={data.start_time}
                                                className="form-control"
                                                onChange={(e) => setData('start_time', e.target.value)}
                                            />
                                            {errors.start_time && <div className="text-danger">{errors.start_time}</div>}

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
                                            <label htmlFor="course_id">Trainer</label>

                                            <Select
                                                options={userOptions}
                                                value={userOptions.find(c => c.value === data.teacher_id)}
                                                onChange={(selected) => setData('teacher_id', selected?.value || '')}
                                                isSearchable={true}
                                                placeholder="Select Trainer..."
                                            />
                                            {errors.teacher_id && <div className="text-danger">{errors.teacher_id}</div>}
                                        </div>
                                        <div className="row">
                                            <div className="row">
                                            {[0,1,2,3,4,5,6].map(day => (
                                            <div className="col-2" key={day}>
                                                <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="week_days[]"
                                                    value={day}
                                                    checked={data.week_days.includes(day)}
                                                    onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setData('week_days', [...data.week_days, day]);
                                                    } else {
                                                        setData('week_days', data.week_days.filter(d => d !== day));
                                                    }
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor={`switch${day}`}>
                                                    {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][day]}
                                                </label>
                                                </div>
                                            </div>
                                            ))}


                                        </div>

                                        </div>
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="nick_name">Notes</label>
                                            <textarea
                                                id="nick_name"
                                                rows={6}
                                                name="nick_name"

                                                value={data.nick_name}
                                                className="form-control"
                                                onChange={(e) => setData('nick_name', e.target.value)}
                                            />
                                            {errors.nick_name && <div className="text-danger">{errors.nick_name}</div>}
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
