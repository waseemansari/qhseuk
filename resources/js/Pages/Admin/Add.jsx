import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';
import Select from 'react-select';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function Add({ roles ,branches}) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        role_id: '',
        phone: '',
        email: '',
        status: '',
        designation: '',
        branch_id:''
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('user-management.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                    showNotification('User Added successfully!', 'success', 2000);
            },
            onError: (errors) => {
                console.log('errors', errors);
                showNotification('User  failed!', 'error', 3000);
            },
        });
    };
    
    const roleOptions = roles.map(role => ({
        value: role.id,
        label: role.name
    }));
    const branchOptions = branches.map(branch => ({
        value: branch.id,
        label: branch.name
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
                <AddItemBreadCrums routeName="user-management.create" name="Add User" details="Add User for setting " />
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
                                                className="form-control"
                                                onChange={(e) => setData('designation', e.target.value)}
                                            />
                                            {errors.designation && <div className="text-danger">{errors.designation}</div>}

                                        </div>
                                        { (auth?.user?.email==='waseem0320@gmail.com' || auth?.user?.email==='nikki@qhseinternational.com') && (
                                            <div className="col-lg-4 col-sm-6">
                                                <label htmlFor="role_id">Branch Name</label>
                                                <Select
                                                    options={branchOptions}
                                                    value={branchOptions.find(c => c.value === data.branch_id)}
                                                    onChange={(selected) => setData('branch_id', selected?.value || '')}
                                                    isSearchable={true}
                                                    placeholder="Select branch..."
                                                    required={true}
                                                />
                                                {errors.branch_id && <div className="text-danger">{errors.branch_id}</div>}
                                            </div>
                                        )}
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
