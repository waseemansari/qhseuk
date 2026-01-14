<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ElearningStudentWelcomeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $student;
    public $plainPassword;
    public $company;

    public function __construct($student, $plainPassword)
    {
        $this->student = $student;
        $this->plainPassword = config('custom.password');
        $this->company = config('custom');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to QHSE International E-Learning',
        );
    } 

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        
         return new Content(
            view: 'emails.elearning_welcome',
            with: [
                'student' => $this->student,
                'password' => $this->plainPassword,
                'company' => $this->company,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
