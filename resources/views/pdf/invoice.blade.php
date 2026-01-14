<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - {{ $payment->invoice_number ?? 'N/A' }}</title>
    <style>
        /* Basic Styles matching your CSS */
        table, td, th {
            border: 1px solid black;
            border-collapse: collapse;
        }
        .header {
            background: #c5d9f0;
            font-weight: bold;
            text-align: center;
        }
        .amount {
            font-weight: bold;
            text-align: center;
        }
        /* Custom class for the description/amount row without background */
        .header-no-background {
            border: 1px solid black;
            text-align: center; /* Centering for better layout */
            font-weight: normal;
        }
        /* Body and Font Styles */
        body {
            font-family: Arial, sans-serif;
            color: #000;
        }
    </style>
</head>
<body>

<div class="card border-0 shadow mb-4">
    <div class="card-body">
        <div id="invoice_print" class="mt-4">

            <table width="100%" cellPadding="6">
                <tbody>
                    {{-- HEADER LOGO + TITLE --}}
                    <tr>
                        <td width="50%" rowspan="3" style="text-align: center;">
                            {{-- Replace with your asset path if not using a dynamic variable --}}
                            @php
                                $logo_url = $branch->logo ?? '/assets/img/brand/logo.png';
                            @endphp
                            <img src="{{ $logo_url }}" height="80" alt="Company Logo"/>
                        </td>

                        <td colspan="3" style="font-size: 26px; font-weight: bold; text-align: center;">
                            QHSE International
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" style="font-weight: bold; text-align: center;">
                            {{ $branch->address ?? 'Company Address N/A' }}
                        </td>
                    </tr>

                    {{-- CUSTOMER DETAILS HEADER --}}
                    <tr>
                        <td class="header">Customer Details</td>
                        <td class="header">Invoice #</td>
                    </tr>

                    <tr>
                        <td>
                            Customer Name: {{ $payment->student->name ?? 'N/A' }}
                        </td>
                        <td style="font-weight: bold; text-align: center;">
                            {{ $payment->student->student_number ?? 'N/A' }}
                        </td>
                        <td style="font-weight: bold; text-align: center;">
                            {{ $payment->invoice_number ?? 'N/A' }}
                        </td>
                    </tr>

                    {{-- COMPANY --}}
                    <tr>
                        <td colspan="1">
                            Company: {{ $payment->student->company ?? 'No' }}
                        </td>
                        <td class="header">Customer ID</td>
                        <td class="header">Due Date</td>
                    </tr>

                    <tr>
                        <td>
                            Phone: {{ $payment->student->whatsapp_number ?? 'N/A' }}
                        </td>
                        <td style="text-align: center; font-weight: bold;">
                            {{ $payment->student->student_number ?? 'N/A' }}
                        </td>
                        <td style="text-align: center; font-weight: bold;">
                            {{ $payment->due_date ?? 'N/A' }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Email: {{ $payment->student->email ?? 'N/A' }}
                        </td>
                        <td colspan="2" class="header">VAT Registration #</td>
                    </tr>

                    <tr>
                        <td></td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">
                            {{ $branch->national_tax ?? 'N/A' }}
                        </td>
                    </tr>

                    {{-- DESCRIPTION --}}
                    <tr>
                        <td colspan="2" class="header">Description</td>
                        <td class="header">Amount</td>
                    </tr>

                    <tr>
                        <td colspan="2" class="header-no-background">{{ $payment->description ?? 'N/A' }}</td>
                        <td class="header-no-background">
                            {{ $payment->amount_paid ?? '0.00' }} {{ $branch->currency ?? 'USD' }}
                        </td>
                    </tr>

                    {{-- EMPTY ROWS --}}
                    <tr><td colspan="3" class="header-no-background">&nbsp;</td></tr>
                    <tr><td colspan="3" class="header-no-background">&nbsp;</td></tr>
                    <tr><td colspan="3" class="header-no-background">&nbsp;</td></tr>

                    {{-- SUMMARY --}}
                    <tr>
                        <td class="header">Amount in Words:</td>
                        <td class="header">Subtotal</td>
                        <td class="amount">
                            {{ $payment->amount_paid ?? '0.00' }} {{ $branch->currency ?? 'USD' }}
                        </td>
                    </tr>

                    <tr>
                        <td rowspan="3" style="font-weight: bold;">
                            {{ $payment->amount_in_words ?? 'Zero' }}
                        </td>
                        <td class="header">VAT:</td>
                        <td class="amount">
                            {{ $payment->tax ?? '0.00' }} {{ $branch->currency ?? 'USD' }}
                        </td>
                    </tr>

                    <tr>
                        <td class="header">Discount:</td>
                        <td class="amount">
                            {{ $payment->discount ?? '0.00' }} {{ $branch->currency ?? 'USD' }}
                        </td>
                    </tr>

                    <tr>
                        <td class="header">Balance to be paid:</td>
                        <td class="amount">
                            {{ $payment->due ?? '0.00' }} {{ $branch->currency ?? 'USD' }}
                        </td>
                    </tr>

                    {{-- TERMS --}}
                    <tr>
                        <td class="header">Terms and Conditions:</td>
                        <td class="header">Total Amount</td>
                        <td class="amount">
                            {{ $payment->amount ?? '0.00' }} {{ $branch->currency ?? 'USD' }}
                        </td>
                    </tr>

                    <tr>
                        {{-- Original HTML had colspan=8, changed to 3 to match table columns --}}
                        <td colspan="3">
                            If you have any questions concerning this invoice,<br />
                            contact {{ $branch->email ?? 'N/A' }}
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3">Thank you for doing business with us.</td>
                    </tr>

                    <tr>
                        <td class="header">Received By</td>
                        <td class="text-capitalize" colspan="2">
                            {{ $payment?->receivedByUser?->name  }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</div>

</body>
</html>