<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use App\Mail\CertificateMail; 
use Illuminate\Support\Facades\Mail;
use App\Models\{User, Student,Course,Enrollment,Section };

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
        
        $certificates = Certificate::query()
            ->with(['course','student','branch','user'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('student', function ($q) use ($search) {
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
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Certificate/List', [
            'certificates' => $certificates,
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
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $validated = $request->validate([
                'certificate_number' => 'required|string|max:255',
                'certificate_date' => 'required|string|max:255',
                'remarks' => 'required|string',
               
            ]);
            $request['certificate_status']='Arrived';
            $certificate = Certificate::create($request->all());
            $lastId = $certificate->id;
            $certificate =  Certificate::with(['student','course'])->findorfail($certificate->id);
            
            Mail::to($certificate?->student->email)->send(new CertificateMail($certificate));

            return redirect()->route('enrollment.index')->with('success', 'Certificate added successfully!');
        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $certificate = Certificate::with(['student','course'])->findorfail($id);
        return Inertia::render('Certificate/Edit', [
            'certificate' => $certificate,
        ]);
    }

    public function resent_email($id)
    {
        
        $certificate =  Certificate::with(['student','course'])->findorfail($id);
        Mail::to($certificate?->student->email)->send(new CertificateMail($certificate));
        return redirect()->route('certificate.index')->with('success', 'EMail sended successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($enrollment_id)
    {
        $enrollment = Enrollment::query()->with(['course','students'])->findorfail($enrollment_id);
        return Inertia::render('Certificate/Add', [
            'enrollment' => $enrollment,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificate $certificate)
    {
      
        $validated = $request->validate([
            'certificate_status' => 'required|string|max:255',
        ]);
        if($request->collected_by){
           $validated['collected_by']=$request->collected_by;
        }
        if($request->collected_by){
           $validated['receiver_name']=$request->receiver_name;
        }
        if($request->return_reason){
           $validated['reason_of_return']=$request->return_reason;
        }
        if($request->courier_company){
           $validated['courier_company']=$request->courier_company;
        }
       
        
        $certificate->update($validated);
        return redirect()->route('certificate.index')->with('success', 'Course updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        
            if (!empty($certificate->attachment) && Storage::disk('spaces')->exists($certificate->attach_receiver_id)) {
                Storage::disk('spaces')->delete($student->attach_receiver_id);
            }
            $certificate->delete();
            return redirect()->back()->with('success', 'Certificate and attachment deleted successfully!');
        
    }

     public function bulkDelete(Request $request)
    {
        
        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            $certificates = Certificate::whereIn('id', $ids)->get(['id', 'attach_receiver_id']);
            foreach ($certificates as $certificate) {
                if (!empty($certificate->attachment) && Storage::disk('spaces')->exists($certificate->attachment)) {
                    Storage::disk('spaces')->delete($certificate->attachment);
                }
            }
            Certificate::whereIn('id', $ids)->delete();
            return back()->with('success', 'Selected deleted successfully.');
        }
        return back()->with('error', 'No  selected.');
    }

    public function CertificateFollowUp(Request $request){
        $branchId = Auth::user()->branch_id;
        
        $certificates = Certificate::query()
            ->with(['course','student','branch','user'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('student', function ($q) use ($search) {
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
            ->when($request->date, fn($q, $date) =>
                $q->where('expiry_date','<=' ,$date)
            )
            ->where('expiry_date','!=','')
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Certificate/FollowUpList', [
            'certificates' => $certificates,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? '',
            ],
        ]);

    }
}
