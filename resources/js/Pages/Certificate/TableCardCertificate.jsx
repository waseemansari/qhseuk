import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import BulkActionHandler from "@/Components/BulkActionHandler";
import { showNotification } from '@/Components/Notification';

const TableCardCertificate = ({ title, headers = [], data = [] }) => {
  const { post } = useForm({});
  const {
    selectedIds,
    handleCheckboxChange,
    handleSelectAll,
    bulkAction,
    setBulkAction,
    handleBulkAction,
  } = BulkActionHandler({ data, title });
  const resend = (e, id) => {
    e.preventDefault();
    
    post(route('certificate.resed_email', id), {
      _method: 'put',
      forceFormData: true, // important for file uploads
      preserveScroll: true,
      onSuccess: () => {
        showNotification('certificate resend successfully!', 'success', 3000);
      },
      onError: () => {
        showNotification('Failed to resend certificate.', 'error', 3000);
      },
    });
  };
  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-body">
        {/* Header with title and Bulk Action */}
        <div className="d-flex mb-3">
          <select
            className="form-select fmxw-200"
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
          >
            <option value="">Bulk Action</option>
            {title === "Student" && (
              <>
                <option value="1">Send Email</option>
                <option value="2">Enroll Elearning</option>
              </>
            )}
            <option value="3">Delete {title}</option>
          </select>

          <button
            className="btn btn-sm px-3 btn-secondary ms-3"
            onClick={handleBulkAction}
          >
            Apply
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-centered table-nowrap mb-0 rounded">
            <thead className="thead-light">
              <tr>
                <th>
                  <div className="form-check dashboard-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                      checked={
                        selectedIds.length === data.data?.length && data.data?.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                    <label className="form-check-label" htmlFor="checkAll"></label>
                  </div>
                </th>
                {headers.map((header, index) => (
                  <th key={index}>{header.label}</th>
                ))}
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length > 0 ? (
                data.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td
                    >
                      <div className="form-check dashboard-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                        <label className="form-check-label"></label>
                      </div>
                    </td>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex}>
                        {header.key === "branch_id" ? (

                          row.branch ? row.branch.name : "-"
                        ) :

                          header.key === "student_number" ? (

                            row.student ? row.student.student_number : "-"
                          ) :
                            header.key === "name" ? (

                              row.student ? row.student.name : "-"
                            ) :
                              header.key === "mobile" ? (

                                row.student ? row.student.mobile : "-"
                              ) :
                                header.key === "whatsapp_number" ? (

                                  row.student ? row.student.whatsapp_number : "-"
                                ) :
                                  header.key === "email" ? (

                                    row.student ? row.student.email : "-"
                                  ) :

                                    header.key === "created_by" ? (

                                      row.user ? row.user.name : "-"
                                    ) :
                                      header.key === "course_id" ? (

                                        row.course ? row.course.name : "-"
                                      ) : header.key === "created_at" ? (

                                        new Date(row[header.key]).toLocaleString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      ) : header.key === "attachment" && row.attachment_url ? (
                                        <a
                                          href={row.attachment_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="btn btn-primary"
                                        >
                                          View
                                        </a>

                                      ) : row[header.key] ? (

                                        row[header.key].length > 40 ? (
                                          `${row[header.key].substring(0, 40)}...`
                                        ) : (
                                          row[header.key]
                                        )
                                      ) : (
                                        "-"
                                      )}
                      </td>
                    ))}

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
                            href={`/${title.toLowerCase()}/${row?.id}`}
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => ''}
                          >
                            <SquarePen size={16} className="dropdown-icon text-info me-2" />
                            Edit
                          </Link>
                          <button

                            className="dropdown-item d-flex align-items-center"
                            onClick={(e) => resend(e, row?.id)}
                          >
                            <SquarePen size={16} className="dropdown-icon text-info me-2" />
                            Resend
                          </button>

                          {/* <ConfirmDeleteButton
                            id={row.id}
                            routeName={`${title.toLowerCase()}`} // your Laravel route prefix (e.g., course.destroy)
                          /> */}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length + 2} className="text-center text-muted py-3">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-end">
            <Pagination links={data.links} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCardCertificate;
