import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import BreadCrums from "@/Components/BreadCrums";
import { SquarePen } from "lucide-react";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';

export default function List({ roles }) {
   
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Role management
                </h2>
            }
        >
            <Head title="Role management" />
            <>
                <BreadCrums routeName="role.index" name="Role" />

                <div className="card border-0 shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap mb-0 rounded">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {roles?.data?.length > 0 ? (
                                        roles.data.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{row.id}</td>
                                               <td>{row.name}</td>

                                                <td className="text-center">
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <svg
                                                                className="icon icon-xs"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                            </svg>
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu dashboard-dropdown dropdown-menu-start mt-2 py-1">
                                                            <Link
                                                                href={`/role/${row?.id}/edit`}
                                                                className="dropdown-item d-flex align-items-center"
                                                                onClick={() => ''}
                                                            >
                                                                <SquarePen size={16} className="dropdown-icon text-info me-2" />
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                href={`/role/${row?.id}`}
                                                                className="dropdown-item d-flex align-items-center"
                                                                onClick={() => ''}
                                                            >
                                                                <SquarePen size={16} className="dropdown-icon text-info me-2" />
                                                                Asign role to permission
                                                            </Link>

                                                            <ConfirmDeleteButton
                                                                id={row.id}
                                                                routeName={`role`} // your Laravel route prefix (e.g., course.destroy)
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={roles.length + 2} className="text-center text-muted py-3">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-end">
                                <Pagination links={roles?.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </AuthenticatedLayout>
    );
}
