<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreStudentRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Allow all authenticated users
    }

    public function rules()
    {
        $studentId = $this->route('student')?->id;
        return [
            'student_number'      => 'nullable|string|max:15',
            'name'                => 'required|string',
            'mobile'              => 'required|string|max:20',
            'whatsapp_number'     => [
                'required',
                'string',
                'max:15',
                Rule::unique('students', 'whatsapp_number')->ignore($studentId),
            ],
            'email'               => [
                'required',
                'email',
                'max:100',
                Rule::unique('students', 'email')->ignore($studentId),
            ],
            'region'              => 'required|string|max:200',
            'gender'              => 'required|in:male,female',
            'date_of_birth'       => 'required|date',
            'student_status'      => 'nullable|string',
            'address'             => 'required|string',
            'country'             => 'required|string|max:100',
            'nationality'         => 'required|string|max:100',
            'company'             => 'required|string|max:50',
            'job_position'        => 'required|string|max:100',
            'course_id'           => 'required|integer|exists:courses,id',
            'study_mode'          => 'required|string|max:100',
            'language'            => 'required|string|max:200',
            'remarks'             => 'nullable|string',
            'attachment'          => 'nullable|file|mimes:jpg,jpeg,png,webp,pdf|max:2048',
            'registration_date'   => 'nullable|date',
            'contact_person'      => 'nullable|string|max:100',
            'enroll_status'      => 'nullable|integer|max:100',
            'follow_up_date'      => 'nullable',
            'whatsapp_group'      => 'nullable',
            'follow_up_msg'      => 'nullable',
            'email_file'         => 'nullable|file|mimes:pdf|max:3000',

            
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Student name is required',
            'gender.required' => 'Please select gender',
            'gender.in' => 'Gender must be either male or female',
            'whatsapp_number.required' => 'Whatsapp number is required',
            'attachment.mimes' => 'Attachment must be jpg, jpeg, png, webp, or pdf',
        ];
    }
}
