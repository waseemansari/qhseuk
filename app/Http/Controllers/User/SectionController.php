<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use App\Models\{User, Section,Course };

class SectionController extends Controller
{
    
    public function index(Request $request)
    {
       $branchId = Auth::user()->branch_id;

        $sections = Section::query()
            ->with('course')
            ->whereHas('course', function ($c) use ($branchId) {
                $c->where('branch_id', $branchId);
            })
            ->when($request->search, function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('nick_name', 'like', "%{$search}%")
                        ->orWhere('start_date', 'like', "%{$search}%")
                        ->orWhere('end_date', 'like', "%{$search}%");
                });
            })
             ->when($request->selectedCourse, fn($q, $selectedCourse) =>
                $q->where('course_id', $selectedCourse)
            )
            ->orderBy('id', 'DESC')
            ->paginate(25)
            ->withQueryString();
 
        $courses = Course::where('status','active')->get(['id','name']);
        $batch = Section::where('course_id',$request->selectedCourse)->get(['id','name']);

        return Inertia::render('Batch/List', [
            'sections' => $sections,
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
        $course = Course::where('status','active')->get(['id','name']);
        $users = User::where('status','active')->get(['id','name']);
        return Inertia::render('Batch/Add', [
            'courses' => $course,
            'users'=>$users
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required',
            'name' => 'required|string|max:255',
            'start_date' => 'required|max:255',
            'end_date' => 'required|string|max:255',
            'number_of_days' => 'required|max:255',
            'nick_name' => 'required|string|max:255',
            'course_id' => 'required'
        ]);

        $request['class_dates'] = '';
     
        $request['week_days'] = json_encode($request->week_days);

        Section::create($request->all());

        return redirect()->route('batch.index')->with('success', 'Course updated successfully!');
    }

    public function edit(Section $batch)
    {
        $course = Course::where('status','active')->get(['id','name']);
        $users = User::where('status','active')->get(['id','name']);
        return Inertia::render('Batch/Edit', [
            'courses' => $course,
            'batch'=>$batch,
            'users'=>$users
        ]);
    }
    public function destroy(Section $section,$id)
    {
       
        $section = Section::findorfail($id);
        $section->delete();
        return redirect()->back()->with('success', 'section and attachment deleted successfully!');
        
    }

     public function bulkDelete(Request $request)
    {
        
            $ids = $request->input('ids', []);
            if (!empty($ids)) {
                Section::whereIn('id', $ids)->delete();
                return back()->with('success', 'Selected section deleted successfully.');
            }
            return back()->with('error', 'No section selected.');
    }
}
