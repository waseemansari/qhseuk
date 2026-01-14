import React,{useState,useEffect } from 'react';
import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import BeautifulDatePicker from '@/Components/BeautifulDatePicker';

export default function Edit({ student, courses, countries }) {
    const [clander,setClander]=useState(false);
    const [message,setMessage]=useState(false);
    const [fee,setFee]=useState(false);
    
    const [emailAttach,setEmailAttach]=useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        student_number: student.student_number || '',
        name: student.name,
        mobile: student.mobile,
        email: student.email,
        region: student.region || '',
        gender: student.gender || 'male',
        date_of_birth: student.date_of_birth || '',
        whatsapp_number: student.whatsapp_number || '',
        student_status: student.student_status || '',
        address: student.address || '',
        country: student.country || '',
        nationality: student.nationality || '',
        company: student.company || '',
        job_position: student.job_position || '',
        course_id: student.course_id || '',
        study_mode: student.study_mode || '',
        language: student.language || '',
        remarks: student.remarks || '',
        registration_date: student.registration_date || '',
        contact_person: student.contact_person || '',
        status: student.status || 'active',
        attachment: null,
        email_file:null,
        follow_up_date: student.follow_up_date,
        follow_up_msg:student.follow_up_msg,
        whatsapp_group:student.whatsapp_group,
        _method: 'put',
    });
    const handleFileChange = (e) => {
        setData('attachment', e.target.files[0]);
    };
    const handleEmailFileChange = (e) => {
        setData('email_file', e.target.files[0]);
    };
    
    const handleStudentStatus = (e) => {
        setData('student_status', e.target.value);
     
        if(e.target.value==='Followup' || e.target.value==='Call-back' ){
            setClander(true);
            setMessage(true);
            setFee(false);
            setEmailAttach(false);
        }
       
        else if(e.target.value==='Send-Email' ){
            setEmailAttach(true);
            setMessage(true);
            setClander(false);
            setFee(false);
        }
        else if(e.target.value==='Enrollement' ){
            setFee(true);
            setClander(false);
            setMessage(false);
            setEmailAttach(false);
        }
        else{
            setClander(false);
            setMessage(false);
            setFee(false);
            setEmailAttach(false);
        }
    };
    useEffect(() => {
        if (student.student_status) {
            // Simulate dropdown behavior on load
            handleStudentStatus({ target: { value: student.student_status } });
        }
    }, [student.student_status]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('student.update', student.id), {
            _method: 'put',
            forceFormData: true, // important for file uploads
            preserveScroll: true,
            onSuccess: () => {
                showNotification('Student updated successfully!', 'success', 3000);
            },
            onError: () => {
                showNotification('Failed to update student.', 'error', 3000);
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
                <AddItemBreadCrums routeName="student.create" name="Edit Student" details="Edit Student for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">

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
                                                value={data.email}
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
                                                value={data.region}
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
                                                value={data.address}
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
                                                value={data.company}
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
                                                value={data.job_position}
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
                                                value={data.study_mode}
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
                                                value={data.nationality}
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
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="attachment">Attach Id</label>
                                            <input
                                                onChange={handleFileChange}
                                                id="attachment"
                                                type="file"
                                                name="attachment"
                                                className="form-control"
                                            />
                                            {errors.attachment && <div className="text-danger">{errors.attachment}</div>}
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="language">Language</label>
                                            <input
                                                id="language"
                                                type="text"
                                                name="language"
                                                value={data.language}
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
                                                value={data.remarks}
                                                className="form-control"
                                                onChange={(e) => setData('remarks', e.target.value)}
                                            />
                                            {errors.remarks && <div className="text-danger">{errors.remarks}</div>}

                                        </div>
                                        <div className="col-lg-4 col-sm-6">

                                            <label htmlFor="student_status">Student Status</label>
                                            <select
                                                id="student_status"
                                                name="student_status"
                                                className="form-control"
                                                value={data.student_status}
                                                onChange={ handleStudentStatus}
                                            >
                                                <option value="">Select Option</option>
                                                <option value="Followup">Followup</option>
                                                <option value="Call-back">Call back</option>
                                                <option value="Send-Email">Send Email</option>
                                                <option value="Enrollement">Enrollement</option>
                                            </select>
                                            {errors.student_status && <div className="text-danger">{errors.student_status}</div>}
                                        </div>
                                         <div className="col-lg-4 col-sm-6">
                                            <fieldset>
                                                <legend className="h6">Whatsapp Group</legend>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="whatsapp_group"
                                                        id="whatsapp_group_yes"
                                                        value="yes"
                                                        checked={data.whatsapp_group === 'yes'}
                                                        onChange={(e) => setData('whatsapp_group', e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor="whatsapp_group_yes">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="whatsapp_group"
                                                        id="whatsapp_group_no"
                                                        value="not"
                                                        checked={data.whatsapp_group === 'not'}
                                                        onChange={(e) => setData('whatsapp_group', e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor="whatsapp_group">
                                                         No
                                                    </label>
                                                </div>
                                                {errors.whatsapp_group && <div className="text-danger">{errors.whatsapp_group}</div>}
                                            </fieldset>
                                            
                                        </div>
                                    </div>
                                    <div className="row ">
                                    {clander &&
                                    <>
                                       <div className="col-lg-4 col-sm-6">
                                       <label htmlFor="follow_up_date">Clander</label>
                                            <input
                                                id="follow_up_date"
                                                type="date"
                                                name="follow_up_date"
                                                required
                                                value={data.follow_up_date}
                                                className="form-control"
                                                onChange={(e) => {
                                                        setData('follow_up_date', e.target.value);
                                                        console.log('Selected date:', e.target.value);
                                                    }}
                                            />
                                            {errors.follow_up_date && <div className="text-danger">{errors.follow_up_date}</div>}
                                        </div>
                                    </>
                                    }
                                    {emailAttach &&
                                    <>
                                    <div className="col-lg-4 col-sm-6">
                                       <label htmlFor="email_file">Attachement</label>
                                            <input
                                                id="email_file"
                                                type="file"
                                                name="email_file"
                                               
                                                className="form-control"
                                                onChange={handleEmailFileChange}
                                            />
                                            {errors.email_file && <div className="text-danger">{errors.email_file}</div>}
                                        </div>
                                        
                                    </>
                                    }
                                    {fee &&
                                    <>
                                    <div className="col-lg-4 col-sm-6">
                                       <label htmlFor="fee">Fee</label>
                                            <input
                                                id="fee"
                                                type="number"
                                                name="fee"
                                               
                                                className="form-control"
                                                onChange={(e) => setData('fee', e.target.value)}
                                                
                                            />
                                            {errors.fee && <div className="text-danger">{errors.fee}</div>}
                                        </div>
                                        
                                    </>
                                    }
                                    {(message)&&
                                    <>
                                        <div className="col-lg-8 col-sm-8">
                                       <label htmlFor="follow_up_msg">Message</label>
                                            <textarea
                                                id="follow_up_msg"
                                                required
                                                name="follow_up_msg"
                                                defaultValue={data.follow_up_msg}
                                                className="form-control"
                                                onChange={(e) => setData('follow_up_msg', e.target.value)}
                                            />
                                            {errors.follow_up_msg && <div className="text-danger">{errors.follow_up_msg}</div>}
                                        </div>
                                        
                                    </>
                                    }
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
