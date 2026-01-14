import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Plus } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function PaymentHeader({ routeName, ...props }) {
  
  const { props: pageProps } = usePage();
  const initialSearch = pageProps?.ziggy?.query?.search || "";
  const [search, setSearch] = useState(initialSearch);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);
  const [courseFee, setCourseFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [paid, setPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);

  useEffect(() => {
    if (props.result && props.result.length > 0) {
      // Sum all total_amount values
      const Amount = props.result.reduce((acc, item) => acc + Number(item.total_amount), 0);
      const fee = props.result.reduce((acc, item) => acc + Number(item.course_fee), 0);
      const paid = props.result.reduce((acc, item) => acc + Number(item.paid), 0);
      const tx = props.result.reduce((acc, item) => acc + Number(item.total_tax), 0);
      const desc = props.result.reduce((acc, item) => acc + Number(item.discount), 0);
      const due = props.result.reduce((acc, item) => acc + Number(item.due), 0);

      setTotalAmount(Amount);
      setCourseFee(fee);
      setPaid(paid);
      setTax(tx);
      setDiscount(desc);
      setTotalDue(due);
    }
  }, [props.result]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route(routeName),
        { search, startDate, endDate },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      );
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, startDate, endDate]); // run when search or status changes

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
            <Link
              href={`/payment/create`}
              className="btn btn-sm btn-gray-800 d-inline-flex align-items-center"
            >
              <Plus size={20} /> New {props.name}
            </Link>

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
            <input type="date" className="form-control" placeholder="From date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input type="date" className="form-control" placeholder="To date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="input-group me-2 me-lg-3 fmxw-300">

              <input type="text" className="form-control" placeholder={`Search ${props['name']}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          <div className="row mt-4">
            {/* Total Invoices */}
            <div className="col-md-2 col-sm-6 mb-3 text-success">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">Total</h6>
                <h4 className="fw-bold">{courseFee}</h4>
              </div>
            </div>
            {/* Total Due */}
            <div className="col-md-2 col-sm-6 mb-3 text-primary">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">Total Paid</h6>
                <h4 className="fw-bold">{paid}</h4>
              </div>
            </div>

            {/* Total Paid */}
            <div className="col-md-2 col-sm-6 mb-3 text-warning">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted"> Discount</h6>
                <h4 className="fw-bold">{discount}</h4>
              </div>
            </div>

            {/* Total Discount */}
            <div className="col-md-2 col-sm-6 mb-3 text-danger">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">Balance </h6>
                <h4 className="fw-bold">{totalDue}</h4>
              </div>
            </div>

            {/* Total Tax */}
            <div className="col-md-2 col-sm-6 mb-3 text-info">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">Total Tax</h6>
                <h4 className="fw-bold">{tax}</h4>
              </div>
            </div>

            

          </div>

        </div>
      </div>

    </>

  );
}
