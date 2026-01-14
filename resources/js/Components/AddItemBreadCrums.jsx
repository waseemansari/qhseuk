import React from "react";

export default function AddItemBreadCrums({...props }) {
    
    return (
        <div className="py-4 mb-3" >
            <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
                    <li className="breadcrumb-item">
                        <a href="#">
                            <svg className="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        </a>
                    </li>
                    <li className="breadcrumb-item"><a href="#">CRM</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{props['name']}</li>
                </ol>
            </nav>
            <div className="d-flex justify-content-between w-100 flex-wrap">
                <div className="mb-2 mb-lg-0">
                    <h1 className="h4">{props['name']}</h1>
                    {/* <p className="mb-0">{props['details']}</p> */}
                </div>
               
            </div>
        </div>

    );
}
