<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Auth;
use App\Helpers\StudentHelper;

 

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_number',
        'name',
        'mobile',
        'whatsapp_number',
        'email',
        'region',
        'gender',
        'date_of_birth',
        'whatsapp_number',
        'student_status',
        'address',
        'country',
        'nationality',
        'company',
        'job_position',
        'course_id',
        'study_mode',
        'language',
        'remarks',
        'attachment',
        'registration_date',
        'contact_person',
        'created_by',
        'branch_id',
        'status',
        'enroll_status',
        'follow_up_date',
        'follow_up_msg',
        'email_file',
        'whatsapp_group'
    ];

    /**
     * Define relationships here
     * Example: if Student belongs to Course
     */
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->select('id','name');
    }

   
    public function contact_person()
    {
        return $this->belongsTo(User::class, 'contact_person')->select('id', 'name');
    }
    public function enrollment()
    {
        return $this->hasMany(Enrollment::class, 'student_id');
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
        static::creating(function ($student) {
            // Automatically set branch_id if not already set
            if (!$student->branch_id) {
                $student->branch_id = Auth::user()->branch_id ?? 0;
            }
            if (!$student->created_by) {
                $student->created_by = Auth::user()->id ?? 0;
            }
       
            $student->student_number = StudentHelper::generateStudentNumber();
        });

          static::updating(function ($student) {
            
            if (!$student->contact_person) {
                $student->contact_person = Auth::user()->id ?? 0;
            }
            $student->student_number = StudentHelper::generateStudentNumber();
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
