<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use App\Models\{User, Student,Course,Enrollment,Section };
use App\Http\Requests\StoreStudentRequest;
use App\Helpers\ImageUploadHelper;
use Illuminate\Support\Facades\Storage;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
        $courses = Course::where('status','active')->get(['id','name']);

        $batch = [];
        if(!empty($request->selectedCourse)){
          
            $batch = Section::where('course_id',$request->selectedCourse)->get(['id','name']);
        }
        
        $enrollments = Enrollment::query()
            ->with([
                'course',
                'students' => function ($q) {
                    $q->with('contact_person');
                },
            ])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('students', function ($q) use ($search) {
                    $q->where(function ($subQuery) use ($search) {
                        $subQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('student_number', 'like', "%{$search}%")
                            ->orWhere('mobile', 'like', "%{$search}%")
                            ->orWhere('country', 'like', "%{$search}%")
                            ->orWhere('study_mode', 'like', "%{$search}%")
                            ->orWhere('gender', 'like', "%{$search}%")
                            ->orWhere('whatsapp_number', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
                });
            })
            ->when($request->status, fn($q, $status) =>
                $q->where('enrollment_status', $status)
            )
            ->when($request->batch, fn($q, $batch) =>
                $q->where('session_id', $batch)
            )
            ->when($request->selectedCourse, fn($q, $selectedCourse) =>
                $q->where('course_id', $selectedCourse)
            )
            ->whereHas('students', function ($q) use ($branchId) {
                $q->where('branch_id', $branchId);
            })
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString();


        return Inertia::render('Enrollment/List', [
            'enrollments' => $enrollments,
            'courses'=>$courses,
            'batchs'=>$batch,
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(enrollment $enrollment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(enrollment $enrollment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, enrollment $enrollment)
    {
        //
    } 

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollment $enrollment)
    {
            $enrollment->delete();
            return redirect()->back()->with('success', 'Enrollment deleted successfully!');
        
    }
    
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            Enrollment::whereIn('id', $ids)->delete();
            return back()->with('success', 'Selected Enrollment deleted successfully.');
        }
        return back()->with('error', 'No Enrollment selected.');
    }
}
