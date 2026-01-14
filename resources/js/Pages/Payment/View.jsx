import React from "react";
import { Link,usePage } from "@inertiajs/react";

const View = ({ payment,branch }) => {

    const printInvoice = () => window.print();

    return (
        <div className="card border-0 shadow mb-4">
            <div className="card-body">
                <Link
                    href={`/payment`}
                     className="btn btn-sm btn-gray-800 d-inline-flex align-items-center"

                >
                    Close or Back
                </Link>
                <button
                    onClick={printInvoice}
                    className="btn btn-default btn-icon icon-left hidden-print pull-right"
                >
                    Print Invoice
                </button>

                <div id="invoice_print" className="mt-4">

                    <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: "collapse", fontFamily: "Arial", color: "#000" }}>

                        {/* HEADER LOGO + TITLE */}
                        <tbody>
                            <tr>
                                <td width="50%" rowSpan="3" style={{ textAlign: "center", border: "1px solid black" }}>
                                    <img src={branch?.logo ?? "/assets/img/brand/logo.png"} height="80" />
                                </td>

                                <td colSpan="3" style={{ fontSize: 26, fontWeight: "bold", textAlign: "center", border: "1px solid black" }}>
                                    QHSE International
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3" style={{ fontWeight: "bold", textAlign: "center", border: "1px solid black" }}>
                                    {branch?.address}
                                </td>
                            </tr>

                            {/* CUSTOMER DETAILS HEADER */}
                            <tr>
                                <td style={header}>Customer Details</td>
                                <td style={header}>Invoice #</td>
                            
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }}>
                                    Customer Name:  {payment?.student?.name}
                                </td>
                                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                                    {payment?.student?.student_number}
                                </td>
                                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                                    {payment?.invoice_number}
                                </td>
                                
                            </tr>

                            {/* COMPANY */}
                            <tr>
                                <td colSpan="1" style={{ border: "1px solid black" }}>
                                    Company: {payment?.student?.company ?? "No"}
                                </td>
                                <td style={header}>Customer ID</td>
                                <td style={header}>Due Date</td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }}>
                                    Phone: {payment?.student.whatsapp_number}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {payment?.student.student_number}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {payment?.due_date}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }}>
                                    Email: {payment?.student.email}
                                </td>
                                <td colSpan="2" style={header}>VAT Registration #</td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }}></td>
                                <td colSpan="2" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {branch?.national_tax}
                                </td>
                            </tr>

                            {/* DESCRIPTION */}
                            <tr>
                                <td colSpan="2" style={header}>Description</td>
                                <td style={header}>Amount</td>
                            </tr>

                            <tr>
                                <td colSpan="2" style={headerNoBackground}>{payment?.description}</td>
                                <td style={headerNoBackground}>{payment?.amount_paid}  {branch?.currency}</td>
                            </tr>

                            {/* EMPTY ROWS */}
                            <tr><td colSpan="3" style={headerNoBackground}>&nbsp;</td></tr>
                            <tr><td colSpan="3" style={headerNoBackground}>&nbsp;</td></tr>
                            <tr><td colSpan="3" style={headerNoBackground}>&nbsp;</td></tr>

                            {/* SUMMARY */}
                            <tr>
                                <td style={header}>Amount in Words:</td>
                                <td style={header}>Subtotal</td>
                                <td style={amount}>{payment?.amount_paid}  {branch?.currency}</td>
                            </tr>

                            <tr>
                                <td rowSpan="3" style={{ fontWeight: "bold", border: "1px solid black" }}>
                                    {payment.amount_in_words}
                                </td>
                                <td style={header}>VAT:</td>
                                <td style={amount}>{payment?.tax}  {branch?.currency}</td>
                            </tr>

                            <tr>
                                <td style={header}>Discount:</td>
                                <td style={amount}>{payment?.discount}  {branch?.currency}</td>
                            </tr>

                            <tr>
                                <td style={header}>Balance to be paid:</td>
                                <td style={amount}>{payment?.due}  {branch?.currency}</td>
                            </tr>

                            {/* TERMS */}
                            <tr>
                                <td style={header}>Terms and Conditions:</td>
                                <td style={header}>Total Amount</td>
                                <td style={amount}>{payment?.amount}  {branch?.currency}</td>
                            </tr>

                            <tr>
                                <td colSpan={8} style={{ border: "1px solid black" }}>
                                    If you have any questions concerning this invoice,<br />
                                    contact {branch?.email}
                                </td>
                            </tr>
                            

                            <tr colSpan={8} style={{ border: "1px solid black" }}>
                                <td >Thank you for doing business with us.</td>
                            

                            </tr>
                            

                            <tr>
                                <td style={header}>Received By</td>
                                <td className="text-capitalize" colSpan="2" style={{ border: "1px solid black", }}>
                                    {payment?.received_by_user?.name}
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

const header = {
    fontWeight: "bold",
    textAlign: "center",
    background: "#c5d9f0",
    border: "1px solid black"
};
const headerNoBackground = {
    fontWeight: "bold",
    textAlign: "center",
    background: "#fff",
    border: "1px solid black"
};

const amount = {
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid black"
};

export default View;
