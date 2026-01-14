import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { showNotification  } from '@/Components/Notification';

export default function CourseAdd({ course }) {
 const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        name_numeric: '',
        teacher_id: '',
        attachment: '',
        description: '',
        current_batch: 'null',
        branch_id: '',
        status: 'active',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('course.store'), {
            
             preserveScroll: true,
             onSuccess: () => {
                reset(),
                showNotification('Course Added successfully!', 'success',2000);
             },
            onError: (errors) => {
                console.log('errors',errors);
                 showNotification('Course  failed!', 'error',3000);
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Course
                </h2>
            }
        >
            <Head title="Course" />
            <>
                <AddItemBreadCrums routeName="course.create" name="Add Course" details="Add course for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="row m-2 ">
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="mb-4">
                                                <label htmlFor="name">Course name</label>
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
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="mb-4">
                                                <label htmlFor="name_numeric">Accreditation Body</label>
                                                <input
                                                    id="name_numeric"
                                                    name="name_numeric"
                                                    value={data.name_numeric}
                                                    className="form-control"
                                                    autoComplete="name_numeric"
                                                    
                                                    onChange={(e) => setData('name_numeric', e.target.value)}
                                                    
                                                />
                                                {errors.name_numeric && <div className="text-danger">{errors.name_numeric}</div>}
                                         
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="mb-4">
                                                <label htmlFor="attachment">Attachment</label>
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
                                        <div className="col-lg-12 col-sm-12">
                                            <div className="mb-4">
                                                <label htmlFor="description">Description</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={data.description}
                                                    className="form-control"
                                                    autoComplete="description"
                                                    rows={5}
                                                   
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    
                                                />
                                                {errors.description && <div className="text-danger">{errors.description}</div>}

                                            </div>
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
