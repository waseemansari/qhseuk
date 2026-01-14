<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
class BankDetails extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'address',
        'branch_id',
        'iban_number',
        'account_number',
        'created_by',
    ];
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id')->select('id', 'title');
    }
    protected static function booted()
    {
        static::creating(function ($branch) {
            if (!$branch->branch_id) {
                $branch->branch_id = Auth::user()->branch_id ?? 0;
            } 
            if (!$branch->created_by) {
                $branch->created_by = Auth::user()->id ?? 0;
            }
        });
    }
}
