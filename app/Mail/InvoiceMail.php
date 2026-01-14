<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment; // Import the Attachment class
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue; // Import this
// Use the PDF facade
use Barryvdh\DomPDF\Facade\Pdf; 

class InvoiceMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $payment;
    public $branch; // Ensure you pass 'branch' if your view needs it
    // Removed $file and $fileName as we generate the PDF inside the Mailable

    /**
     * Create a new message instance.
     * We only need $payment and $branch for the view data
     */
    public function __construct($payment, $branch)
    {
        $this->payment = $payment;
        $this->branch = $branch; // Set the branch data
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Invoice - #' . ($this->payment->invoice_number ?? 'N/A'),
        );
    }

    /**
     * Get the message content definition (for the email body).
     * You can use a simple text view here, or the same invoice view.
     */
    public function content(): Content
    {
        return new Content(
            // Use a simple, brief view for the actual email content
            view: 'emails.invoice', 
            with: [
                'student_name' => $this->payment->student->name ?? 'Customer',
            ]
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        // 1. Generate the PDF from the Blade view
        $pdf = Pdf::loadView('pdf.invoice', [
            'payment' => $this->payment,
            'branch' => $this->branch, // Pass the required data to the view
        ]);

        // 2. Define the file name
        $fileName = 'invoice-' . ($this->payment->invoice_number ?? time()) . '.pdf';

        return [
            // Attach the raw PDF content
            Attachment::fromData(fn () => $pdf->output(), $fileName)
                ->withMime('application/pdf'),
        ];
    }
}