<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'expense_category_id',
        'exp_payment_status',
        'title',
        'payment_type',
        'invoice_number',
        'payer_type',
        'company_id',
        'student_id',
        'method',
        'description',
        'tax',
        'discount',
        'amount',
        'amount_paid',
    ];
}
