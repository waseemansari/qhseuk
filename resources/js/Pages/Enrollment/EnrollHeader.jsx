import React, { useEffect, useState } from "react";
import { router,Link ,usePage } from "@inertiajs/react";
import Select from 'react-select';
import { Plus } from 'lucide-react';


export default function EnrollHeader({routeName,courses,...props  }) {
   const { url } = usePage();
 
  const { props: pageProps } = usePage();
  const initialSearch = pageProps?.ziggy?.query?.search || ""; 
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState("");
  const [batch, setBatch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  
   useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route(routeName),
        { search, status,selectedCourse ,batch}, 
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      );
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, status,selectedCourse,batch]); 
  
    const courseOptions = props['data']?.map(course => ({
        value: course.id,
        label: course.name
    }));
    const allCourses = [
        { value: '', label: 'Select Course' },
        ...courseOptions,
    ];
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
            url.startsWith('/batch') && 
              <>
                <Link
                  href={`/${props.name.toLowerCase()}/create`}
                  className="btn btn-sm btn-gray-800 d-inline-flex align-items-center"
                >
                  <Plus size={20} /> New Batch
                </Link>
              </>
                  
        }
          </div>
          
        </div>
       
      </div> 
       
      <div className="table-settings mb-4">
        <div className="row justify-content-between align-items-center">
          <div className="col-9 col-lg-8 d-md-flex">
            <div className="input-group me-2 me-lg-3 fmxw-200">
              
              <input type="text" className="form-control" placeholder={`Search ${props['name']}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
               
            </div>
            
            <select className="form-select fmxw-200 d-none d-md-inline"
                aria-label="Message select example 2"
                value={status}
                  onChange={(e) => setStatus(e.target.value)}
              >
              <option value="">All</option>
              
              {props['name'] === "Student"  ?
                <>
                  <option value="Followup">Follow up</option>
                  <option value="Call-back">Call back</option>
                  <option value="Send-Email">Send Email</option>
                  <option value="Enrollement">Enrollement</option>
                </>
              :
              <>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </>
              }
            </select>
             <Select
                    options={allCourses}
                    value={selectedCourse}
                    onChange={(option) => setSelectedCourse(option?.value)}
                    className="form-select fmxw-200"
                    isSearchable={true}
                    />
            
          </div>
            
          <div className="col-3 col-lg-4 d-flex justify-content-end">
               <select className="form-select fmxw-200 d-none d-md-inline"
                aria-label="Message select example 2"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
             <option value="">All</option>
                {props['batchs']?.map((batch) => (
                    <option key={batch.id} value={batch.id}>
                       {batch.name}
                    </option>
                ))}
            </select>
          </div>
         
        </div>
      </div>

    </>

  );
}
