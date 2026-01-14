<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use App\Http\Requests\StoreCompanyRequest;
use App\Models\Company;

class CompanyController extends Controller
{
     /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
         $companies = Company::query()
            ->with('user')
            ->with('branch')
            ->when($request->search, fn($q, $search) =>
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%")
                ->orWhere('country', 'like', "%{$search}%")
                ->orWhere('company_number', 'like', "%{$search}%")
                ->orWhere('contact_person', 'like', "%{$search}%")
                
                ->orWhere('email', 'like', "%{$search}%")
            )
            ->when($request->status, fn($q, $status) =>
                $q->where('company_status', $status)
            )
            ->where('branch_id', $branchId)
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString(); 

        return Inertia::render('Company/List', [
            'companies' => $companies,
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
        $countries = DB::table('countries')->get();

        return Inertia::render('Company/Add', [
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
       
            $validated = $request->validated();
            
            if ($request->hasFile('attachment')) {
                $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'company', 500, 500);
                $validated['attachment'] = $url;
            }
            $company = Company::create($validated);
            if($company){
                // Mail::to($company->email)->send(new WelcomeMail($company));
            }

            if($request->branch_id){                
                return back();
            }
            else{
                 return redirect()->route('company.index')->with('success', 'Company added successfully!');
            } 
    }

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        $countries = DB::table('countries')->get();
           
        return Inertia::render('Company/Edit', [
            'company' => $company,
            'countries' => $countries,
        ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCompanyRequest $request, Company $company)
    {
       
        $validated = $request->validated();
        if ($request->hasFile('email_file')) {
            
            if (!empty($company->email_file) && Storage::disk('spaces')->exists($company->email_file)) {
                Storage::disk('spaces')->delete($company->email_file);
            }

            $email_file = ImageUploadHelper::uploadAndResize($request->file('email_file'), 'company_email', 1000, 1000);
            $validated['email_file'] = $email_file;

        } else {
            
            $validated['email_file'] = $company->email_file;
        }
        $company->update($validated);
            
       
        return redirect()->route('company.index')->with('success', 'Company updated successfully!');
        
    }

      /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
            // $enroll = Enrollment::where('company_id',$company->id)->count();
            // if($enroll > 0){
            //    Enrollment::where('company_id',$company->id)->delete();
            // }
            
            $company->delete();
            return redirect()->back()->with('success', 'Company  deleted successfully!');
        
    }

    public function bulkDelete(Request $request)
    {
        
            $ids = $request->input('ids', []);
            if (!empty($ids)) {
                // Enrollment::whereIn('company_id',$ids)->delete();
                Company::whereIn('id', $ids)->delete();

                return back()->with('success', 'Selected Company deleted successfully.');
            
            }
            return back()->with('error', 'No Company selected.');
        
    }
}
