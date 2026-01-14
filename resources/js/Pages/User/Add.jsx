import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import BeautifulDatePicker from '@/Components/BeautifulDatePicker';

export default function Add({ courses ,countries}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        student_number: '',
        name: '',
        mobile: '',
        whatsapp_number: '',
        email: '',
        region: '',
        gender: 'male',  // default value
        date_of_birth: '',
        whatsapp_number: '',
        student_status: null,
        address: '',
        country: '',
        nationality: '',
        company: '',
        job_position: '',
        course_id: null,
        study_mode: '',
        language: '',
        remarks: '',
        whatsapp_number: null,  // for file input
        registration_date: '',
        contact_person: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('student.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('Student Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('Student  failed!', 'error', 3000);
            },
        });
    };
     const courseOptions = courses.map(course => ({
        value: course.id,
        label: course.name
    }));
    const countriesOptions = countries.map(country => ({
        value: country.name,
        label: country.name
    }));
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student
                </h2>
            }
        >
            <Head title="Student" />
            <>
                <AddItemBreadCrums routeName="student.create" name="Add Student" details="Add Student for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="name">Full name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="form-control"
                                                autoComplete="name"
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="mobile">Mobile Number</label>
                                            <input
                                                id="mobile"
                                                name="mobile"
                                                value={data.mobile}
                                                className="form-control"
                                                autoComplete="mobile"
                                                onChange={(e) => setData('mobile', e.target.value)}
                                            />
                                            {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="whatsapp_number">Whatsup Number</label>
                                            <PhoneInput
                                                country={'ae'} // default country
                                                value={data.whatsapp_number}
                                                onChange={phone => setData('whatsapp_number', phone)}
                                                inputProps={{
                                                    name: 'whatsapp_number',
                                                    required: true,
                                                    className: 'form-control mr-2',
                                                }}
                                                enableSearch
                                                searchPlaceholder="Search country..."
                                            />
                                            
                                            {errors.whatsapp_number && <div className="text-danger">{errors.whatsapp_number}</div>}

                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="email">EMail</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="region">Region</label>
                                            <input
                                                id="region"
                                                type="text"
                                                name="region"
                                                className="form-control"
                                                onChange={(e) => setData('region', e.target.value)}
                                            />
                                            {errors.region && <div className="text-danger">{errors.region}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <fieldset>
                                                <legend className="h6">Gender</legend>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="genderMale"
                                                        value="male"
                                                        checked={data.gender === 'male'}
                                                        onChange={(e) => setData('gender', e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor="genderMale">
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="genderFemale"
                                                        value="female"
                                                        checked={data.gender === 'female'}
                                                        onChange={(e) => setData('gender', e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor="genderFemale">
                                                        Female
                                                    </label>
                                                </div>
                                                {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                            </fieldset>
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-4 col-sm-6">
                                            <BeautifulDatePicker
                                                value={data.date_of_birth}
                                                onChange={(val) => setData('date_of_birth', val)}
                                                error={errors.date_of_birth}
                                            />
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="address">Address</label>
                                            <input
                                                id="address"
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                onChange={(e) => setData('address', e.target.value)}
                                            />
                                            {errors.address && <div className="text-danger">{errors.address}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="company">Company Name</label>
                                            <input
                                                id="company"
                                                type="text"
                                                name="company"
                                                className="form-control"
                                                onChange={(e) => setData('company', e.target.value)}
                                            />
                                            {errors.company && <div className="text-danger">{errors.company}</div>}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="job_position">Job Position</label>
                                            <input
                                                id="job_position"
                                                type="text"
                                                name="job_position"
                                                className="form-control"
                                                onChange={(e) => setData('job_position', e.target.value)}
                                            />
                                            {errors.job_position && <div className="text-danger">{errors.job_position}</div>}
                                        </div>
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
                                            <label htmlFor="study_mode">Study Mode</label>
                                            <select
                                                id="study_mode"
                                                name="study_mode"
                                                className="form-control"
                                                onChange={(e) => setData('study_mode', e.target.value)}
                                            >
                                                <option value="">Select Study Mode</option>
                                                <option value="Class-Room">Class Room</option>
                                                <option value="Online-Class">Online Class</option>
                                                <option value="E-Learning">E-Learning</option>
                                                <option value="D-Learning">D-Learning</option>
                                                <option value="Transfer/External">Transfer/External</option>
                                            </select>   
                                            {errors.study_mode && <div className="text-danger">{errors.study_mode}</div>}
                                        </div>
                                       
                                    </div>
                                     <div className="row mt-4">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="nationality">Nationality</label>
                                            <input
                                                id="nationality"
                                                type="text"
                                                name="nationality"
                                                className="form-control"
                                                onChange={(e) => setData('nationality', e.target.value)}
                                            />
                                            {errors.nationality && <div className="text-danger">{errors.nationality}</div>}
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
                                        
                                       
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="language">Language</label>
                                            <input
                                                id="language"
                                                type="text"
                                                name="language"
                                                className="form-control"
                                                onChange={(e) => setData('language', e.target.value)}
                                            />
                                            {errors.language && <div className="text-danger">{errors.language}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="remarks">Remarks</label>
                                            <input
                                                id="remarks"
                                                type="text"
                                                name="remarks"
                                                className="form-control"
                                                onChange={(e) => setData('remarks', e.target.value)}
                                            />
                                            {errors.remarks && <div className="text-danger">{errors.remarks}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="attachment">Attach Id</label>
                                            <input
                                                id="attachment"
                                                type="file"
                                                name="attachment"
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
