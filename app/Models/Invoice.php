<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
class Invoice extends Model
{
     protected $fillable = [
        'invoice_number',
        'student_id',
        'course_id',
        'course_fee',
        'description',
        'tax',
        'discount',
        'amount',
        'amount_paid',
        'due',
        'due_date',
        'payment_method',
        'status',
        'received_by',
        'acc_status',
        'branch_id',
        'attachment',
        'enroll_id',
        'exam_date',
        'branch_id',
        'bank_id',
        'category'
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class, 'enroll_id');
    }
    
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->select('id','name');
    }
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
    public function bank()
    {
        return $this->belongsTo(BankDetails::class, 'bank_id')->select('id','title');
    }
    public function receivedByUser()
    {
        return $this->belongsTo(User::class, 'received_by')->select('id','name');
    }

    protected static function booted()
    {
        static::creating(function ($invoice) {
            
            if (!$invoice->received_by) {
                $invoice->received_by = Auth::user()->id ?? 0;
            } 
            if (!$invoice->created_by) {
                $invoice->created_by = Auth::user()->id ?? 0;
            }
            if (!$invoice->branch_id) {
                $invoice->branch_id = Auth::user()->branch_id ?? 0;
            } 
        });
    }

    protected $appends = ['attachment_url'];
    public function getAttachmentUrlAttribute()
    {
        if (!empty($this->attachment)) {    
            $baseUrl = rtrim(config('filesystems.disks.spaces.url'), '/');
            return $baseUrl. '/' . ltrim($this->attachment, '/');
        }
        return null;
    }
}  
