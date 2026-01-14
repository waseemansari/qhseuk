<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentDetails extends Model
{
    protected $fillable = [
        'invoice_number',
        'title',
        'description',
        'qty',
        'price',
        'total_amount',
    ];
}
