<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'email',
        'code',
        'type', 
        'country',
        'city',
        'address',
        'contanct_no',
        'email',
        'logo',
        'national_tax',
        'sale_tax',
        'status',
        'currency'
    ];

    public function courses()
    {
        return $this->hasMany(Course::class, 'branch_id');
    }

    public function bank()
    {
        return $this->hasMany(BankDetails::class, 'branch_id');
    }

    public function getLogoAttribute()
    {
        $logo = $this->attributes['logo'] ?? null;

        if ($logo) {
            $baseUrl = rtrim(config('filesystems.disks.spaces.url'), '/');
            return $baseUrl . '/' . ltrim($logo, '/');
        }

        return null;
    }
    
}
