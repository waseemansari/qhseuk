<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
        'name_numeric',
        'description',
        'teacher_id',
        'attachment',
        'current_batch',
        'branch_id',
        'status'
    ];
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id')->select('id', 'name');
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

    protected static function booted()
    {
        static::creating(function ($course) {
            if (!$course->branch_id) {
                $course->branch_id = Auth::user()->branch_id ?? 0;
            } 
        });
    }
}
