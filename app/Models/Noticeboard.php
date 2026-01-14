<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
class Noticeboard extends Model
{
     protected $fillable = [
        'name',
        'description',
        'status',
        'branch_id',
        'created_by'
    ];

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
        static::creating(function ($noticeboard) {
            if (!$noticeboard->branch_id) {
                $noticeboard->branch_id = Auth::user()->branch_id ?? 0;
            }
            if (!$noticeboard->created_by) {
                $noticeboard->created_by = Auth::user()->id ?? 0;
            }
        });  
    }
}
