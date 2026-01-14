import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notification';

export default function Edit({ role }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: role.name,
        _method: 'put',
    });
     const handleSubmit = (e) => {
            e.preventDefault();
    
            post(route('role.update', role.id), {
                _method: 'put',
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    showNotification('Role updated successfully!', 'success', 3000);
                },
                onError: () => {
                    showNotification('Failed to update Role.', 'error', 3000);
                },
            });
    };
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Role
                </h2>
            }
        >
            <Head title="Role" />
            <>
                <AddItemBreadCrums routeName="role.create" name="Add Role" details="Role  for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row ">
                                        <div className="col-lg-12 col-sm-12">
                                            <label htmlFor="name"> name</label>
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
