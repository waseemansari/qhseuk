<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\UserData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\ImageUploadHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\{CourseEnrollEmail,CourseEnrollEmailToAdmin}; 

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
        $Course = Course::query()
            ->with('branch')
            ->when($request->search, fn($q, $search) =>
                $q->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('name_numeric', 'like', "%{$search}%");
                })
            )
            ->where('branch_id', $branchId)
            ->orderBy('id', 'DESC')
            ->paginate(25)
            ->withQueryString(); 

        return Inertia::render('courseManagement/CourseList', [
            'courses' => $Course,
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
        return Inertia::render('courseManagement/CourseAdd');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
            $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_numeric' => 'required|string|max:255',
            'description' => 'required|string',
            'attachment' => 'nullable|file|mimes:png,jpg,jpeg|max:2048',
        ]);

        if ($request->hasFile('attachment')) {
            $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'course', 200, 200);
            $validated['attachment'] = $url;
        }
         $validated['teacher_id'] = 1;
        Course::create($validated);

        return redirect()->route('course.index')->with('success', 'Course added successfully!');
       
        
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::where('status','active')->get(['id','name']);
        return Inertia::render('Frontend/Course/CourseDetail', [
                'id' => $id,
                'courses' => $course,   
        ]);
    }
    public function courseData(Request $request){
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'mobile' => 'required',
            'location' => 'required|string|max:255',
            'course_id' => 'required|max:255',
            'source' => 'required|string|max:255',
        ]);
        
        UserData::create($validated);

         Mail::to($validated['email'])->send(new CourseEnrollEmail($validated['name']));
        
        Mail::to('momani@qhseinternational.com')->send(new CourseEnrollEmailToAdmin($validated));
        
        return redirect()->back()->with('success', 'Data added successfully!');

         
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        
            return Inertia::render('courseManagement/EditCourse', [
                'course' => $course,
            ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'attachment' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required|string|in:active,inactive',
        ]);

        if ($request->hasFile('attachment')) {
        // Delete old file from DigitalOcean
        if (!empty($course->attachment) && Storage::disk('spaces')->exists($course->attachment)) {
            Storage::disk('spaces')->delete($course->attachment);
        }

        $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'course', 200, 200);
        $validated['attachment'] = $url;
        } else {
            // Keep the existing attachment if no new file uploaded
            $validated['attachment'] = $course->attachment;
        }

        // Update the course
        $course->update($validated);
        return redirect()->route('course.index')->with('success', 'Course updated successfully!');
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
         
            if (!empty($course->attachment) && Storage::disk('spaces')->exists($course->attachment)) {
                Storage::disk('spaces')->delete($course->attachment);
            }
            $course->delete();
            return redirect()->back()->with('success', 'Course and attachment deleted successfully!');
        
    }

     public function bulkDelete(Request $request)
    {
        
            $ids = $request->input('ids', []);
            if (!empty($ids)) {
                $courses = Course::whereIn('id', $ids)->get(['id', 'attachment']);

                foreach ($courses as $course) {
                    if (!empty($course->attachment) && Storage::disk('spaces')->exists($course->attachment)) {
                        Storage::disk('spaces')->delete($course->attachment);
                    }
                }
                Course::whereIn('id', $ids)->delete();
                return back()->with('success', 'Selected Course deleted successfully.');
            }
            return back()->with('error', 'No Course selected.');
        

    }
}
