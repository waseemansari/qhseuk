import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Plus } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function BreadCrums({ routeName, ...props }) {
  const { auth } = usePage().props;
  const permissions = auth?.user?.permissions ?? [];
  const can = (permission) => permissions.includes(permission);

  const { props: pageProps } = usePage();
  const initialSearch = pageProps?.ziggy?.query?.search || "";
  const [search, setSearch] = useState(initialSearch);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState("");
  const { url } = usePage();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route(routeName),
        { search, status, date },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      );
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, status, date]); // run when search or status changes

  return (
    <>
      <div className="py-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
              <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
                <li className="breadcrumb-item">
                  <a href="#"><svg className="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">CRM</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{props['name']} List</li>
              </ol>
            </nav>
            <h2 className="h4">{props['name']} List</h2></div><div className="btn-toolbar mb-2 mb-md-0">
        
            {

              (!url.startsWith('/certificate-follow-up') && !url.startsWith('/certificate')) && (
                can(props?.permission) && (
                  <Link
                    href={`/${props.name.toLowerCase()}/create`}
                    className="btn btn-sm btn-gray-800 d-inline-flex align-items-center"
                  >
                    <Plus size={20} /> New {props.name}
                  </Link>
                )
              )
            }


            <div className="btn-group ms-2 ms-lg-3">
              <button type="button" className="btn btn-sm btn-outline-gray-600">Share</button>
              <button type="button" className="btn btn-sm btn-outline-gray-600">Export</button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="row justify-content-between align-items-center">
          <div className="col-9 col-lg-8 d-md-flex">
            <div className="input-group me-2 me-lg-3 fmxw-300">
              <span className="input-group-text">
                <svg
                  className="icon icon-xs"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 
                     4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input type="text" className="form-control" placeholder={`Search ${props['name']}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {
              url.startsWith('/certificate-follow-up') ? (
                <input type="date" className="form-control" placeholder={`Search ${props['name']}`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              )
                :
                (
                  <select className="form-select fmxw-200 d-none d-md-inline"
                    aria-label="Message select example 2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">All</option>

                    {
                      (props['name'] === "Student") || (props['name'] === "Company") ?
                        <>
                          <option value="Followup">Follow up</option>
                          <option value="Call-back">Call back</option>
                          <option value="Send-Email">Send Email</option>
                          <option value="Set-Appointment">Set Appointment</option>
                          <option value="Prospect">Prospect</option>
                          <option value="Enrollement">Enrollement</option>
                        </>
                        :
                        <>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </>
                    }

                  </select>
                )
            }

          </div>

          <div className="col-3 col-lg-4 d-flex justify-content-end">
            <div className="btn-group">

              {/* First Dropdown */}
              <div className="dropdown me-1">
                <button
                  className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-1"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    className="icon icon-sm"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 
                0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 
                2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 
                3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 
                0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                    />
                  </svg>
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>

                <div className="dropdown-menu dropdown-menu-end pb-0">
                  <span className="small ps-3 fw-bold text-dark">Show</span>
                  <a className="dropdown-item d-flex align-items-center fw-bold" href="#">
                    10
                    <svg
                      className="icon icon-xxs ms-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 
                  8a1 1 0 01-1.414 0l-4-4a1 
                  1 0 011.414-1.414L8 12.586l7.293-7.293a1 
                  1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a className="dropdown-item fw-bold" href="#">20</a>
                  <a className="dropdown-item fw-bold rounded-bottom" href="#">30</a>
                </div>
              </div>

              {/* Second Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-1"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    className="icon icon-sm"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 
                        0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 
                        2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 
                        2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 
                        1.372.734 2.942 2.106 2.106a1.532 1.532 0 
                        012.287.947c.379 1.561 2.6 1.561 2.978 
                        0a1.533 1.533 0 012.287-.947c1.372.836 
                        2.942-.734 2.106-2.106a1.533 1.533 0 
                        01.947-2.287c1.561-.379 1.561-2.6 
                        0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 
                        1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 
                        3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>

                <div className="dropdown-menu dropdown-menu-xs dropdown-menu-end pb-0">
                  <span className="small ps-3 fw-bold text-dark">Show</span>
                  <a className="dropdown-item d-flex align-items-center fw-bold" href="#">
                    10
                    <svg
                      className="icon icon-xxs ms-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 
                  1.414l-8 8a1 1 0 01-1.414 
                  0l-4-4a1 1 0 
                  011.414-1.414L8 12.586l7.293-7.293a1 
                  1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a className="dropdown-item fw-bold" href="#">20</a>
                  <a className="dropdown-item fw-bold rounded-bottom" href="#">30</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>

  );
}
