<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
class Certificate extends Model
{
    protected $fillable = [
        'student_id',
        'student_number',
        'exam_date',
        'course_id',
        'unit',
        'exam_status',
        'certificate_status',
        'courier_company',
        'certificate_number',
        'certificate_date',
        'remarks',
        'expiry_date',
        'expiry',
        'status',
        'reason_of_return',
        'collected_by',
        'receiver_name',
        'attach_receiver_id',
    ];
    
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->select('id','name');
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id')->select('id', 'name');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'name');
    }

    protected static function booted()
    {
        static::creating(function ($certificate) {
            if (!$certificate->branch_id) {
                $certificate->branch_id = Auth::user()->branch_id ?? 0;
            } 
            if (!$certificate->created_by) {
                $certificate->created_by = Auth::user()->id ?? 0;
            }
        });
    }
}
