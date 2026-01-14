<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use App\Models\{User, Student,Course,Enrollment };
use App\Http\Requests\StoreStudentRequest;
use App\Helpers\ImageUploadHelper;
use Illuminate\Support\Facades\Storage;
use App\Events\ElearningStudentRegistered;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail; 


class StudentManagementcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
        $students = Student::query()
            ->with('contact_person')
            ->with('branch')
            ->with('course')
            ->with('user')
            ->when($request->search, fn($q, $search) =>
                $q->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('mobile', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%")
                        ->orWhere('study_mode', 'like', "%{$search}%")
                        ->orWhere('gender', 'like', "%{$search}%")
                        ->orWhere('whatsapp_number', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
            )
            ->when($request->status, fn($q, $status) =>
                $q->where('student_status', $status)
            )
            ->where('branch_id', $branchId)
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString(); 

        return Inertia::render('User/List', [
            'students' => $students,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? '',
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $course = Course::where('status','active')->get(['id','name']);
        $countries = DB::table('countries')->get();

        return Inertia::render('User/Add', [
            'courses' => $course,
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
       
            $validated = $request->validated();
            $validated['registration_date']= date('Y-m-d');
            if ($request->hasFile('attachment')) {
                $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'student', 500, 500);
                $validated['attachment'] = $url;
            }
            if($request->branch_id){
                $validated['branch_id'] = $request->branch_id;
            }
            if($request->created_by){
                $validated['created_by'] = 0;
            }
            
            $student = Student::create($validated);
            if($student){

                Mail::to($student->email)->send(new WelcomeMail($student));

            }

            if($request->branch_id){                
                return back();
            }
            else{
                 return redirect()->route('student.index')->with('success', 'Student added successfully!');
            } 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        dd('dfdfdfdfdf');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
            $course = Course::where('status','active')->get(['id','name']);
            $countries = DB::table('countries')->get();
           
            return Inertia::render('User/Edit', [
                'student' => $student,
                'courses' => $course,
                'countries' => $countries,
            ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreStudentRequest $request, Student $student)
    {
       
            $validated = $request->validated();
         
            if ($request->hasFile('attachment')) {
            // Delete old file from DigitalOcean
                if (!empty($student->attachment) && Storage::disk('spaces')->exists($student->attachment)) {
                    Storage::disk('spaces')->delete($student->attachment);
                }
                $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'student', 200, 200);
                $validated['attachment'] = $url;

            } else {
                // Keep the existing attachment if no new file uploaded
                $validated['attachment'] = $student->attachment;
            }
            if ($request->hasFile('email_file')) {
            // Delete old file from DigitalOcean
                if (!empty($student->email_file) && Storage::disk('spaces')->exists($student->email_file)) {
                    Storage::disk('spaces')->delete($student->email_file);
                }
                $email_file = ImageUploadHelper::uploadAndResize($request->file('email_file'), 'student_email', 1000, 1000);
                $validated['email_file'] = $email_file;

            } else {
               
                $validated['email_file'] = $student->email_file;
            }
          
            // Update the course
            $student->update($validated);
            
            if($request->student_status=='Enrollement'){
                $student_exit = Enrollment::where(['student_id'=>$student->id,'course_id'=>$request->course_id,'enrollment_status'=>'active'])->count();
             
                if($student_exit==0){                
                    Enrollment::create([
                        'student_number'   => $student->student_number,
                        'student_id'       => $student->id,
                        'days'             => config('custom.days'),
                        'vanue'            => config('custom.vanue'),
                        'course_id'         => $request->course_id,
                        'session_id'       => $request->course_id,
                        'course_fee'       => $request->fee,
                        'bln'              => $request->fee,
                        'exam_type'        => null, // optional
                        'enrollment_date'  => date('Y-m-d'),
                        'enrollment_status'=> 'active'
                    ]);
                }
                $validated['enroll_status']='enrolled';
                 $student->update($validated);

            }
            return redirect()->route('student.index')->with('success', 'Student updated successfully!');
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        
            if (!empty($student->attachment) && Storage::disk('spaces')->exists($student->attachment)) {
                Storage::disk('spaces')->delete($student->attachment);
            }

            $enroll = Enrollment::where('student_id',$student->id)->count();
            if($enroll > 0){
               Enrollment::where('student_id',$student->id)->delete();
            }
            
            $student->delete();
            return redirect()->back()->with('success', 'Student and attachment deleted successfully!');
        
    }

    public function bulkDelete(Request $request)
    {
        
            $ids = $request->input('ids', []);
            if (!empty($ids)) {
                $students = Student::whereIn('id', $ids)->get(['id', 'attachment']);
                if($students){
                    foreach ($students as $student) {
                        if (!empty($student->attachment) && Storage::disk('spaces')->exists($student->attachment)) {
                            Storage::disk('spaces')->delete($student->attachment);
                        }
                    }
                }
                
                Enrollment::whereIn('student_id',$ids)->delete();
                Student::whereIn('id', $ids)->delete();

                return back()->with('success', 'Selected students deleted successfully.');
            
            }
            return back()->with('error', 'No students selected.');
        
    }

    ///////////////enroll elearning 
    public function EnrollElearning(Request $request)
    {
         
            $ids = $request->input('ids', []);
            $users = DB::connection('mysql_second')->table('student')->first();
          
            if (!empty($ids)) {
                $students = Student::whereIn('id', $ids)->get();
                event(new ElearningStudentRegistered($students));
             
                return back()->with('success', 'Enroll students  successfully.');
            
            }
            
            return back()->with('error', 'No students selected.');
        
    }

}
