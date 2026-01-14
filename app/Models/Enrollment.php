<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
     use HasFactory;

    protected $table = 'enrollments'; 

    protected $fillable = [
        'student_number',
        'student_id',
        'days',
        'vanue',
        'course_id',
        'session_id',
        'course_fee',
        'exam_type',
        'enrollment_date',
        'enrollment_status',
        'attachment',
        'bln',
    ];
     public function students()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->select('id','name');
    }

    protected static function booted()
    {
        static::creating(function ($enrollment) {
            if (!$enrollment->branch_id) {
                $enrollment->branch_id = Auth::user()->branch_id ?? 0;
            } 
            if (!$enrollment->created_by) {
                $enrollment->created_by = Auth::user()->id ?? 0;
            }
        });
    }
}
