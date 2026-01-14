<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCompanyRequest extends FormRequest
{
    public function authorize()
    {
        // Allow all authenticated users to make this request
        return true;
    }

    public function rules()
    {
        // Get the company ID if updating (handles both {company} and {id} route params)
        $companyId = $this->route('company')?->id ?? $this->route('id');

        return [
            'name'                => 'required|string|max:255',
            'company_number'      => 'nullable|string|max:255',
            'trn_number'          => 'nullable|string|max:255',
            'address'             => 'nullable|string|max:200',
            'website'             => 'nullable|string|max:255',
            'country'             => 'nullable|string|max:255',
            'contact_person'      => 'nullable|string|max:100',
            'contact_mobile'      => 'nullable|string|max:100',
            'contact_email'       => 'nullable|email|max:50',
            'contact_designation' => 'nullable|string|max:100',
            'region'              => 'nullable|string|max:100',
            'details'             => 'nullable|string|max:255',
            'remarks'             => 'nullable|string',
            'source'              => 'nullable|string|max:100',
            'random_no'           => 'nullable|string|max:255',
            'company_status'      => 'nullable|in:Followup,Call-back,Send-Email,Enrollement',
            'status'              => 'nullable|in:active,inactive',
            'enroll_status'       => 'nullable|in:enrolled,not enrolled',
            'action_date'         => 'nullable|date',
            'action_notes'        => 'nullable|string',
            'follow_up_date'        => 'nullable|date',
            'follow_up_msg'        => 'nullable|string',

            'phone' => [
                'required',
                'string',
                'max:15',
                Rule::unique('companies', 'phone')->ignore($companyId),
            ],

            'email' => [
                'required',
                'email',
                'max:100',
                Rule::unique('companies', 'email')->ignore($companyId),
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required'     => 'Company name is required.',
            'email.required'    => 'Email address is required.',
            'email.email'       => 'Please provide a valid email address.',
            'email.unique'      => 'This email address is already in use.',
            'phone.required'    => 'Phone number is required.',
            'phone.unique'      => 'This phone number is already in use.',
            'action_date.date'  => 'Please enter a valid date.',
        ];
    }
}
