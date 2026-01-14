<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()   :  bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
     public function rules()
    {
        // Get the company ID if updating (handles both {company} and {id} route params)
        $paymentId  =  $this->route('payment')?->id ?? $this->route('id');

        return [
            'student_id'          => 'required|max: 255',
            'course_id'           => 'required|max: 255',
            'course_fee'          => 'nullable|number|max: 200',
            'bln'                 => 'nullable|string|max: 255',
            'due_date'            => 'required|string|max: 255',
            'description'         => 'required|string|max: 100',
            'tax'                 => 'nullable|max: 100',
            'discount'            => 'nullable',
            'amount'              => 'nullable|string|max: 100',
            'amount_paid'         => 'nullable|string|max: 100',
            'enroll_id'           => 'required|max: 255',
            'invoice_number'      => 'required|max: 255',
            'payment_method'      => 'required|string|max: 255',
            'bank_id'             => 'required_if:payment_method,bank-transfer|nullable|max:100',
            'exam_date'           => 'nullable|string|max: 255',
            'category'            => 'nullable|string|max: 255',
            'payment_details'     => 'nullable',
            'url_id'              => 'nullable',
            'attachment'          => 'nullable|file|mimes:jpg,jpeg,png,webp,pdf|max:2048',

          
        ];
    }

    public function messages()
    {
        return [
            'student_id.required' => 'student is required.',
            'course_id.required'  => 'Course is required.',
            'bank_id.required_if'  => 'Bank is required.',
           
        ];
    }
}
