import AddItemBreadCrums from '@/Components/AddItemBreadCrums';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { showNotification  } from '@/Components/Notification';

export default function CourseAdd({ course }) {
 const { data, setData, post,put, processing, errors, reset } = useForm({
        name: course.name || '',
        description: course.description || '',
        name_numeric: course.name_numeric || '',
        branch_id: course.branch_id || '',
        status: course.status || 'active',
        attachment: null,
         _method: 'put', 
    });
 
    const handleFileChange = (e) => {
    setData('attachment', e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('course.update', course.id), {
        _method: 'put',
      forceFormData: true, // important for file uploads
      preserveScroll: true,
      onSuccess: () => {
        showNotification('Course updated successfully!', 'success', 3000);
      },
      onError: () => {
        showNotification('Failed to update course.', 'error', 3000);
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
                <AddItemBreadCrums routeName="course.create" name="Edit Course" details="Add course for setting " />
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow components-section">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}   encType="multipart/form-data">
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
                                                    onChange={handleFileChange}
                                                    id="attachment"
                                                    type="file"
                                                    name="attachment"
                                                    className="form-control"
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
                                        <div className="col-lg-12 col-sm-12">
                                            <div className="mb-4">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="flexSwitchCheckChecked"
                                                    checked={data.status === 'active'}
                                                    onChange={(e) => setData('status', e.target.checked ? 'active' : 'inactive')}
                                                />
                                                
                                                {/* {errors.description && <div className="text-danger">{errors.description}</div>} */}

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
