import WebsiteBavbar from "@/Layouts/WebsiteBavbar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import coursesList from "@/data/coursesList.json";
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import 'react-phone-input-2/lib/style.css';
export default function Welcome({ courses, id }) {
    // Find the course by id
    const selectedCourse = coursesList.find(course => course.id === Number(id));

    // Tabs
    const tabs = [
        "About the Course",
        "Recognition",
        "Course Contents",
        "Assessments",
        "Course Duration",
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Course not found
    if (!selectedCourse) {
        return <h2 style={{ padding: 40 }}>Course not found</h2>;
    }
    // Filter sections for the active tab
    const filteredSections = selectedCourse.sections.filter(
        (section) => section.category === activeTab
    );
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        mobile: '',
        location: '',
        course_id: '',
        source: '',
   
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('course.course-data'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Data Saved successfully!', 'success', 2000);
            },
            onError: (errors) => {
                showNotification('Data  failed!', 'error', 3000);
            },
        });
    };

    const courseOptions = courses.map(course => ({
        value: course.id,
        label: course.name
    }));
    return (
        <>
            <WebsiteBavbar />

            {/* Tabs */}
            <section className="filter-section">
                <div className="container">
                    <div className="filter-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`filter-tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="courses-section">
                <div className="container">
                    <h1>{selectedCourse.title}</h1>

                    {filteredSections.map((section) => (
                        <div key={section.id} className="course-section">
                            <h3>{section.category}</h3>
                            <p style={{ whiteSpace: "pre-line" }}>{section.text}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="py-5 bg-light">
                <div className="container">
                    <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Request a call from the team for details.</h3>
                    <form onSubmit={submit}>
                        <div className="row ">
                            <div className="col-12">
                                <div className="form-group-modern">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        className={`form-control-modern ${errors.name ? 'is-invalid' : ''}`}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <label className="form-label-modern"> Name (required)</label>
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group-modern">
                                    <input
                                        type="email"
                                        placeholder=" "
                                        className={`form-control-modern ${errors.email ? 'is-invalid' : ''}`}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <label className="form-label-modern">Email ID (required)</label>
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group-modern">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        className={`form-control-modern ${errors.mobile ? 'is-invalid' : ''}`}
                                        value={data.mobile}
                                        onChange={(e) => setData('mobile', e.target.value)}
                                    />
                                    <label className="form-label-modern">Mobile Number (required)</label>
                                    {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group-modern">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        className={`form-control-modern ${errors.location ? 'is-invalid' : ''}`}
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                    />
                                    <label className="form-label-modern">Location/ City (required)</label>
                                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group-modern">
                                    <Select
                                        options={courseOptions}
                                        value={courseOptions.find(c => c.value === data.course_id)}
                                        onChange={(selected) => setData('course_id', selected?.value || '')}
                                        isSearchable={true}
                                        placeholder="Select Course..."
                                    />
                                    {errors.course_id && <div className="text-danger">{errors.course_id}</div>}
                                    <label className="form-label-modern">Select Course(required)</label>
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group-modern">
                                    <select
                                        className={`form-control-modern ${errors.source ? 'is-invalid' : ''}`}
                                        value={data.source}
                                        onChange={(e) => setData('source', e.target.value)}
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="google">Google</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="friend">Friend / Referral</option>
                                        <option value="email">Email</option>
                                        <option value="x.com">X.com</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <label className="form-label-modern">
                                        Where have you heard about us? (required)
                                    </label>

                                    {errors.source && (
                                        <div className="invalid-feedback">{errors.source}</div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="mt-4 text-end">
                            <button type="submit" className="btn btn-primary mb-3" style={{ marginBottom: '10px' }} disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>

            </section>
            <Footer />
        </>
    );
}
