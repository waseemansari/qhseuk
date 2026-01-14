import React from "react";
import { SquarePen } from "lucide-react";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import BulkActionHandler from "@/Components/BulkActionHandler";
import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
const BranchCard = ({ title, headers = [], data = [] }) => {
  
    const {
      selectedIds,
      handleCheckboxChange,
      handleSelectAll,
      bulkAction,
      setBulkAction,
      handleBulkAction,
    } = BulkActionHandler({ data, title });
  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-body">
       

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
                        {
                        header.key === "branch_id" ? (
                          // 🏢 Show branch name
                          row.branch ? row.branch.name : "-"
                        ) 
                        :
                        header.key === "type" ? (
                          "Branch"
                        ) 
                        :
                        
                        header.key === "course_id" ? (
                          row?.course ? row?.course.name : "-"
                        ) : header.key === "created_at" ? (
                          // 🕒 Format date
                          new Date(row[header.key]).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        ) : header.key === "logo" && row.logo ? (
                          // 🖼️ Show image preview if URL exists
                          <img
                            src={row.logo}
                            alt="logo"
                            style={{
                              width: "100px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #ddd",
                            }}
                          />
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
                            href={`/${title.toLowerCase()}/${row?.id}/edit`}
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => ''}
                          >
                            <SquarePen size={16} className="dropdown-icon text-info me-2" />
                            Edit
                          </Link>
                         
                           <ConfirmDeleteButton
                            id={row.id}
                            routeName={`${title.toLowerCase()}`} 
                          />
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

export default BranchCard;
