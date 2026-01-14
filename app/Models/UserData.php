<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
class UserData extends Model
{

    protected $fillable = [
        'name',
        'email',
        'mobile',
        'location',
        'course_id',
        'source',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->select('id','name');
    }
}
