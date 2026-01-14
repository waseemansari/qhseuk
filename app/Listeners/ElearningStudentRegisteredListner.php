<?php

namespace App\Listeners;

use App\Events\ElearningStudentRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Mail\ElearningStudentWelcomeMail;
use Illuminate\Support\Facades\Mail;


class ElearningStudentRegisteredListner implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    { 
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ElearningStudentRegistered $event): void
    {
        if (!empty($event->student) && count($event->student) > 0) {
            foreach ($event->student as $student) {
                $data1 = [
                    'first_name'       => $student->name,
                    'last_name'        => $student->name,
                    'sur_name'         => $student->name,
                    'email'            => $student->email,
                    'password'         => Hash::make(config('custom.password')),
                    'mobile_number'    => $student->whatsapp_number,
                    'dob'              => $student->date_of_birth,
                    'referred_by'      => $student->company,
                    'mail_address'     => $student->email,
                    'addition_email'   => $student->email,
                    'allocate_trainer' => config('custom.crm_folder'),
                    'nationality'      => $student->nationality,
                    'language'         => $student->language ?? 'English',
                    'age'              => 25,
                    'gender'           => $student->gender,
                    'company'          => $student->company,
                    'job_position'     => $student->job_position,
                    'source'           => $student->company,
                    'status'           => 0,
                    'student_type'     => 1,
                    'platform'         => 1,
                    'last_login'       => now(),
                    'course_id'        => 1,
                    'new_password'     => Hash::make(config('custom.password')),
                ];
                $checkStudent = DB::connection('mysql_second')->table('student')->where('email',$student->email)->count();
                if($checkStudent){

                    DB::connection('mysql_second')->table('student')->insert($data1);
                    Mail::to($student->email)->send(new ElearningStudentWelcomeMail($student,config('custom.password')));
                 }
               
                

            }
        }
    }
}
