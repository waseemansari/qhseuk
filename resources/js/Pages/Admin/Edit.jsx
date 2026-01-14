import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function Edit({user, roles }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        role_id: user.role_id,
        phone:  user.phone,
        email:  user.email,
        status: user.status,
        designation:  user.designation,
        _method: 'put',
    });
    

    const handleSubmit = (e) => {
            e.preventDefault();
    
            post(route('user-management.update', user.id), {
                _method: 'put',
                forceFormData: true, // important for file uploads
                preserveScroll: true,
                onSuccess: () => {
                    showNotification('User updated successfully!', 'success', 3000);
                },
                onError: () => {
                    showNotification('Failed to update User.', 'error', 3000);
                },
            });
    };
    
    const roleOptions = roles.map(role => ({
        value: role.id,
        label: role.name
    }));
   
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User
                </h2>
            }
        >
            <Head title="User" />
            <>
                <AddItemBreadCrums routeName="user-management.create" name="Edit User" details="Add User for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
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

                                            <label htmlFor="phone">Phone Number</label>
                                            <PhoneInput
                                                country={'ae'} // default country
                                                value={data.phone}
                                                onChange={phone => setData('phone', phone)}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    className: 'form-control mr-2',
                                                }}
                                                enableSearch
                                                searchPlaceholder="Search country..."
                                            />
                                            
                                            {errors.whatsapp_number && <div className="text-danger">{errors.whatsapp_number}</div>}

                                        </div>
                                   
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
                                        

                                    </div>
                                    
                                    <div className="row mt-4">
                                        
                                         <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="role_id">Role Name</label>
                                             
                                            <Select
                                                options={roleOptions}
                                                value={roleOptions.find(c => c.value === data.role_id)}
                                                onChange={(selected) => setData('role_id', selected?.value || '')}
                                                isSearchable={true}
                                                
                                                placeholder="Select role..."
                                            />
                                            {errors.role_id && <div className="text-danger">{errors.role_id}</div>}
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <label htmlFor="designation">Designation</label>
                                            <input
                                                id="designation"
                                                type="text"
                                                name="designation"
                                                 value={data.designation}
                                                className="form-control"
                                                onChange={(e) => setData('designation', e.target.value)}
                                            />
                                            {errors.designation && <div className="text-danger">{errors.designation}</div>}

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
