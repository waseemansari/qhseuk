<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
use App\Helpers\StudentHelper;


class Company extends Model
{
    protected $fillable = [
        'company_number',
        'name',
        'trn_number',
        'email',
        'address',
        'phone',
        'website',
        'country',
        'contact_person',
        'contact_mobile',
        'contact_email',
        'contact_designation',
        'region',
        'details',
        'remarks',
        'source',
        'random_no',
        'created_by',
        'branch_id',
        'company_status',
        'status',
        'enroll_status',
        'action_date',
        'action_notes',
        'email_file',
        'follow_up_date',
        'follow_up_msg'
    ];
     public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id')->select('id', 'name');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'name');
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
        static::creating(function ($company) {
            if (!$company->branch_id) {

                $company->branch_id = Auth::user()->branch_id ?? 0;
            } 
            if (!$company->created_by) {

                $company->created_by = Auth::user()->id ?? 0;
            }
            $company->company_number = StudentHelper::generateCompanyNumber();

        });
    }
} 
