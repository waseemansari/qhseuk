import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { UsersRound,Users, Cog, ChevronRight,BookOpenText,Building2 ,CircleDollarSign,GitBranch } from "lucide-react";

export default function Navbar() {
    const { url } = usePage();
    const { auth } = usePage().props;
    const permissions = auth?.user?.permissions ?? [];
    const can = (permission) => permissions.includes(permission);
    
         
    const isStudentActive = url.startsWith('/student') || url.startsWith('/enrollment') || url.startsWith('/certificate');
    const isCourseActive = url.startsWith('/course') || url.startsWith('/batch');
    const isCompanyActive = url.startsWith('/course') || url.startsWith('/batch');
    const isPaymentActive = url.startsWith('/payment');
    const isRoleActive = url.startsWith('/role') || url.startsWith('/user-management');


    return (
        <>
            <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
                <a className="navbar-brand me-lg-5" href="../../index.html">
                    <img className="navbar-brand-dark" src="../../assets/img/brand/logo.png" alt="logo" /> <img className="navbar-brand-light" src="../../assets/img/brand/logo.png" alt="logo" />
                </a>
                <div className="d-flex align-items-center">
                    <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            <nav
                id="sidebarMenu"
                className="sidebar bg-gray-800 text-white collapse d-lg-block"
                data-bs-parent="#mainNav"
            >
                <div className="position-sticky sidebar-inner px-4 pt-3">
                    <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                        <div className="d-flex align-items-center">
                            <div className="avatar-lg me-4">
                                <img src="../../assets/img/team/profile-picture-3.jpg" className="card-img-top rounded-circle border-white"
                                    alt="Bonnie Green" />
                            </div>
                            <div className="d-block">
                                <h2 className="h5 mb-3">Hi, Jane</h2>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="btn btn-secondary btn-sm d-inline-flex align-items-center"
                                >
                                    <svg className="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Sign Out
                                </Link>

                            </div>
                        </div>
                        <div className="collapse-close d-md-none">
                            <a href="#sidebarMenu" data-bs-toggle="collapse"
                                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true"
                                aria-label="Toggle navigation">
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                    {/* ///////------------------ MENU ITEMS ------------------/////// */}
                    <ul className="nav flex-column pt-3 pt-md-0">
                        <li className="nav-item">
                            <Link href="/dashboard" className="nav-link d-flex align-items-center">
                                <span className="mt-1 ms-1 sidebar-text">
                                    <img src="../../assets/img/brand/logo.png" alt="logo" />

                                </span>
                            </Link>
                        </li>

                        <li className={`nav-item ${url.startsWith('/dashboard') ? 'active' : ''}`}>
                            <Link href="/dashboard" className="nav-link">
                                <span className="sidebar-icon">
                                    <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                </span>
                                <span className="sidebar-text">Dashboard</span>
                            </Link>
                        </li>
                        {can("student management") && (
           
                        <li className={`nav-item ${isStudentActive ? 'active' : ''}`}>
                            <span
                                className={`nav-link collapsed d-flex justify-content-between align-items-center ${isStudentActive ? '' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#submenu-app"
                                aria-expanded={isStudentActive ? 'true' : 'false'}
                            >
                                <span>
                                    <span className="sidebar-icon">
                                        
                                        <UsersRound />
                                    </span>
                                    <span className="sidebar-text">Student</span>
                                </span>
                                <span className="link-arrow">
                                       <ChevronRight className="w-4 h-4 icon icon-sm" />
                                </span>
                            </span>

                            <div
                                className={`multi-level collapse ${isStudentActive ? 'show' : ''}`}
                                role="list"
                                id="submenu-app"
                                aria-expanded={isStudentActive ? 'true' : 'false'}
                            >
                                <ul className="flex-column nav">
                                    {can("student info view") && (
                                        <li className={`nav-item ${isStudentActive ? '' : ''}`}>
                                            <Link
                                                href="/student"
                                                className={`nav-link ${url === '/student' ? 'active' : ''}`}
                                            >
                                                <span className="sidebar-text">Student Information</span>
                                            </Link>
                                        </li>
                                    )}
                                    {can("student enrollment view") && (
                                     <li className={`nav-item ${url === '/enrollment' ? 'active' : ''}`}>
                                        <Link
                                            href="/enrollment"
                                            className={`nav-link ${url === '/enrollment' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Student Enrollment</span>
                                        </Link>
                                    </li>
                                    )}
                                    {can("student certificate view") && (
                                     <li className={`nav-item ${url === '/certificate' ? 'active' : ''}`}>
                                        <Link
                                            href="/certificate"
                                            className={`nav-link ${url === '/certificate' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Certificate Status</span>
                                        </Link>
                                    </li>
                                    )}
                                    {can("student certificate view") && (
                                     <li className={`nav-item ${url === '/certificate-follow-up' ? 'active' : ''}`}>
                                        <Link
                                            href="/certificate-follow-up"
                                            className={`nav-link ${url === '/certificate-follow-up' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Certificate Follow Up</span>
                                        </Link>
                                    </li>
                                    )}
                                    
                                </ul>
                            </div>
                        </li>
                         )}
                        {can("company management") && (
                        <li className={`nav-item ${isCompanyActive ? 'active' : ''}`}>
                            <span
                                className={`nav-link collapsed d-flex justify-content-between align-items-center ${isCompanyActive ? '' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#company-app"
                                aria-expanded={isCompanyActive ? 'true' : 'false'}
                            >
                                <span>
                                    <span className="sidebar-icon">
                                        
                                        <Building2 />
                                    </span>
                                    <span className="sidebar-text">Company</span>
                                </span>
                                <span className="link-arrow">
                                       <ChevronRight className="w-4 h-4 icon icon-sm" />
                                </span>
                            </span>

                            <div
                                className={`multi-level collapse ${isCompanyActive ? 'show' : ''}`}
                                role="list"
                                id="company-app"
                                aria-expanded={isCompanyActive ? 'true' : 'false'}
                            >
                                <ul className="flex-column nav">
                                    
                                    <li className={`nav-item ${isCompanyActive ? '' : ''}`}>
                                        <Link
                                            href="/company"
                                            className={`nav-link ${url === '/student' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Company Information</span>
                                        </Link>
                                    </li>
                                     <li className={`nav-item ${url === '/company' ? 'active' : ''}`}>
                                        <Link
                                            href="/company"
                                            className={`nav-link ${url === '/company' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Company Enrollment</span>
                                        </Link>
                                    </li>
                                     <li className={`nav-item ${url === '/certificate' ? 'active' : ''}`}>
                                        <Link
                                            href="/certificate"
                                            className={`nav-link ${url === '/certificate' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Company Status</span>
                                        </Link>
                                    </li>
                                     <li className={`nav-item ${url === '/certificate-follow-up' ? 'active' : ''}`}>
                                        <Link
                                            href="/certificate-follow-up"
                                            className={`nav-link ${url === '/certificate-follow-up' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-text">Company Follow Up</span>
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </li>
                        )}
                        {can("course management") && (
                        <li className={`nav-item ${isCourseActive ? 'active' : ''}`}>
                            <span
                                className={`nav-link collapsed d-flex justify-content-between align-items-center ${isStudentActive ? '' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#course-app"
                                aria-expanded={isCourseActive ? 'true' : 'false'}
                            >
                                <span>
                                    <span className="sidebar-icon">
                                        
                                        <BookOpenText />
                                    </span>
                                    <span className="sidebar-text">Course</span>
                                </span>
                                <span className="link-arrow">
                                       <ChevronRight className="w-4 h-4 icon icon-sm" />
                                </span>
                            </span>

                            <div
                                className={`multi-level collapse ${isCourseActive ? 'show' : ''}`}
                                role="list"
                                id="course-app"
                                aria-expanded={isCourseActive ? 'true' : 'false'}
                            >
                                <ul className="flex-column nav">
                                     
                                    {can("course view") && (
                                    <li className={`nav-item ${isCourseActive ? '' : ''}`}>
                                        <Link
                                            href="/course"
                                            className={`nav-link ${url === '/course' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-icon"> <BookOpenText /> </span>
                                            <span className="sidebar-text">Manage Course</span>
                                        </Link>
                                    </li>
                                     )}
                                    {can("batch view") && (
                                     <li className={`nav-item ${url === '/course' ? 'active' : ''}`}>
                                        <Link
                                            href="/batch"
                                            className={`nav-link ${url === '/student' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-icon"> <BookOpenText /> </span>
                                            <span className="sidebar-text">Manage Batch</span>
                                        </Link>
                                    </li>
                                     )}
                                    
                                    
                                </ul>
                            </div>
                        </li>
                        )}
                        {can("payment management") && (
                        <li className={`nav-item ${isPaymentActive ? 'active' : ''}`}>
                            <span
                                className={`nav-link collapsed d-flex justify-content-between align-items-center ${isStudentActive ? '' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#payment-app"
                                aria-expanded={isPaymentActive ? 'true' : 'false'}
                            >
                                <span>
                                    <span className="sidebar-icon">
                                        
                                        <CircleDollarSign />
                                    </span>
                                    <span className="sidebar-text">Payments</span>
                                </span>
                                <span className="link-arrow">
                                       <ChevronRight className="w-4 h-4 icon icon-sm" />
                                </span>
                            </span>

                            <div
                                className={`multi-level collapse ${isPaymentActive ? 'show' : ''}`}
                                role="list"
                                id="payment-app"
                                aria-expanded={isPaymentActive ? 'true' : 'false'}
                            >
                                <ul className="flex-column nav">
                                    {can("student payment") && (
                                    <li className={`nav-item ${isPaymentActive ? '' : ''}`}>
                                        <Link
                                            href="/payment"
                                            className={`nav-link ${url === '/payment' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-icon"> <CircleDollarSign /></span>
                                            <span className="sidebar-text">Student Payments</span>
                                        </Link>
                                    </li>
                                    )}
                                    {can("company payment") && (
                                     <li className={`nav-item ${url === '/company-payment' ? 'active' : ''}`}>
                                        <Link
                                            href="/company-payment"
                                            className={`nav-link ${url === '/company-payment' ? 'active' : ''}`}
                                        >
                                            <span className="sidebar-icon"> <CircleDollarSign /></span>
                                            <span className="sidebar-text">Company Payment</span>
                                        </Link>
                                    </li>
                                    )}
                                </ul>
                            </div>
                        </li>
                        )}
                        {can("noticeboard") && (
                        <li className="nav-item ">
                            <Link href="/noticeboard" className="nav-link">
                                <span className="sidebar-icon">
                                    <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path></svg>
                                </span>
                                <span className="sidebar-text">Noticeboard</span>
                            </Link>
                        </li>
                        )}
                        
                        {can("user management") && (
                        <li className={`nav-item ${isRoleActive ? 'active' : ''}`}>

                            <span
                                className="nav-link  collapsed  d-flex justify-content-between align-items-center"
                                data-bs-toggle="collapse" data-bs-target="#role_manage">

                                <span className="sidebar-text"><Cog color="goldenrod" />  Setup</span>
                                <span className="link-arrow">
                                    <ChevronRight className="w-4 h-4" />

                                </span>
                            </span>
                            <div className={`multi-level collapse ${isRoleActive ? 'show' : ''}`} role="list"
                                id="role_manage" aria-expanded="false">
                                <ul className="flex-column nav">
                                    {can("user management") && (
                                    <li className="nav-item">
                                        <Link className="nav-link" target="_blank"
                                            href="/user-management">
                                            <span className="sidebar-text"><Users color="goldenrod" /> User Management</span>
                                        </Link>
                                    </li>
                                    )}
                                    {can("role management") && (
                                        <>
                                    <li className="nav-item">
                                        <Link className="nav-link" target="_blank"
                                            href="/role">
                                            <span className="sidebar-text"><Users color="goldenrod" /> Role Management</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" target="_blank"
                                            href="/role">
                                            <span className="sidebar-text"><Users color="goldenrod" /> Permision</span>
                                        </Link>
                                    </li>
                                    </>
                                    )}
                                    
                                    { (auth?.user?.email==='waseem0320@gmail.com' || auth?.user?.email==='nikki@qhseinternational.com') && (
                                     <li className="nav-item">
                                        <Link className="nav-link" target="_blank"
                                            href="/branch">
                                            <span className="sidebar-text"><GitBranch  color="goldenrod"/> Branch</span>
                                        </Link>
                                    </li>
                                    )}
                                    
                                </ul>
                            </div>
                        </li>
                        )}
                        
                        <li className="nav-item">
                            <a href="https://demo.themesberg.com/volt-pro/pages/calendar.html" target="_blank" className="nav-link d-flex justify-content-between">
                                <span>
                                    <span className="sidebar-icon">
                                        <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd"></path></svg>
                                    </span>
                                    <span className="sidebar-text">Calendar</span>
                                </span>
                                <span>
                                    <span className="badge badge-sm bg-secondary ms-1 text-gray-800">Pro</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
