<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $table = 'sections';

    protected $fillable = [
        'teacher_id',
        'name',
        'nick_name',
        'course_id',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'number_of_days',
        'week_days',
        'class_dates',
    ];
     public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->select('id', 'name');
    }
}
