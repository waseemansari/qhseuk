<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use App\Models\{Branch,Payment,Invoice,Course,Student,Enrollment,BankDetails};
use Illuminate\Http\Request; 
use App\Http\Requests\StorePaymentRequest;
use DB;
use Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\StudentHelper;
use App\Helpers\ImageUploadHelper;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;


class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
        $payments = Invoice::query()
            ->with([
                'course','bank','student' => function ($q) use ($branchId) {
                    $q->where('branch_id', $branchId)
                    ->with(['contact_person']);
                 },
                 'enrollment'=>function($e){
                       $e->with('course');
                 }
            ])
            ->when($request->search, function ($query, $search) {
               
                $query->whereHas('student', function ($q) use ($search) {
                    $q->where(function ($subQuery) use ($search) {
                        $subQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('student_number', 'like', "%{$search}%")
                            ->orWhere('mobile', 'like', "%{$search}%")
                            ->orWhere('study_mode', 'like', "%{$search}%")
                            ->orWhere('whatsapp_number', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
                });
                
                 $query->orWhere('invoice_number', 'like', "%{$search}%");
                 $query->orWhere('description', 'like', "%{$search}%");
                 $query->orWhere('due_date', 'like', "%{$search}%");
            })
            ->when($request->startDate, fn($q, $startDate) =>
                $q->where('created_at','>=', $startDate)
            )
             ->when($request->endDate, fn($q, $endDate) =>
                $q->where('created_at','<=', $endDate)
            )
            
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString(); 

            $result =$this->fetchPaymentDash($request->startDate,$request->endDate);

        return Inertia::render('Payment/List', [
            'payments' => $payments,
            'results'=>$result,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request,$id=null)
    {
        if($id){
            
            $students = Student::whereHas('enrollment', function ($q) use ($id) {
                $q->where('id', $id);
            })
            ->where('status', 'active')
            ->get(['id', 'name', 'whatsapp_number']);
        }
        else{
           $students = Student::whereHas('enrollment')->where('status','active')->get(['id','name','whatsapp_number']);

        }
        
        $branchId = Auth::user()->branch_id;
        $countries = DB::table('countries')->get();
        $invoiceNumber = StudentHelper::generatePaymentNumber();
        $banks = BankDetails::where('branch_id',$branchId)->where('status','active')->get(['id','title']);

        return Inertia::render('Payment/Add', [
            'invoiceNumber'=>$invoiceNumber,
            'students'=>$students,
            'banks'=>$banks,
            'id'=>$id
        ]);
    }

    public function getCourses($paymentId,$id)
    {
        if ($id != 0) {
           $enrollments = Enrollment::whereId($id)->with(['course:id,name'])->get(['id', 'course_id', 'course_fee', 'bln']);
        }
        else{
          $enrollments = Enrollment::where('student_id', $paymentId)->with(['course:id,name'])->get(['id', 'course_id', 'course_fee', 'bln']);
        }
        // Merge both course and enrollment info
        $data = $enrollments->map(function ($enrollment) {
            return [
                'enroll_id' => $enrollment->id,
                'id' => $enrollment->course->id,
                'name' => $enrollment->course->name,
                'course_fee' => $enrollment->course_fee,
                'bln' => $enrollment->bln,
            ];
        });

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
            $validated = $request->validated();
            if ($request->hasFile('attachment')) {
                $url = ImageUploadHelper::uploadAndResize($request->file('attachment'), 'payment', 500, 500);
                $validated['attachment'] = $url;
            }

            $enrollData = Enrollment::findorfail($request->enroll_id);
            
            if($enrollData->bln <= 0){
                throw ValidationException::withMessages([
                    'amount' => 'Student already paid for this course',
                ]);
            }

            if($enrollData->bln < ($request->amount + $request->discount)){
                throw ValidationException::withMessages([
                    'amount' => 'Amount + discount will be less than the Balance',
                ]);
            }
            $due_amount = $enrollData->bln - ($request->amount + $request->discount);
            $validated['course_fee'] = $enrollData->course_fee;
            $validated['acc_status'] = 1;
            $validated['due'] = $due_amount;
            $invoice = Invoice::create($validated);
            if($invoice){
                $enData['bln'] = $due_amount;
                $enrollData->update($enData);
                // Mail::to($payment->email)->send(new WelcomeMail($payment));

            }
            if($request->url_id==0){
                 return redirect()->route('payment.index')->with('success', 'Payment added successfully!');

            }
            else{
                return redirect()->route('enrollment.index')->with('success', 'Payment added successfully!');

            }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $branchId = Auth::user()->branch_id;
        $branch = Branch::whereId($branchId)->first(); 
        
        $payment = Invoice::query()
            ->with([
                'receivedByUser','course','bank','student' => function ($q) {
                    $q->with(['contact_person']);
                 },
                 'enrollment'=>function($e){
                       $e->with('course');
                 }
            ])->findorfail($id);
        $payment->amount_in_words = StudentHelper::convertNumberToWord($payment->amount);

        return Inertia::render('Payment/View', [
            'payment'=>$payment,
            'branch'=>$branch
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $invoice = Invoice::findorfail($id);
        if (!empty($invoice->attachment) && Storage::disk('spaces')->exists($invoice->attachment)) {
            Storage::disk('spaces')->delete($invoice->attachment);
        }
        $invoice->delete();
        return redirect()->back()->with('success', 'Payment deleted successfully!');
    }


    private function fetchPaymentDash($fromDate = null, $toDate = null)
    {
        $query = DB::table('invoices as i')
            ->select(
                's.student_number',
                'i.course_id',
                DB::raw('SUM(i.amount_paid) AS total_amount'),
                DB::raw('MAX(i.course_fee) AS course_fee'),
                DB::raw('COALESCE(SUM(i.amount_paid), 0) AS paid'),
                DB::raw('SUM(i.discount) AS discount'),
                DB::raw('SUM(i.tax) AS total_tax'),
                DB::raw('MAX(latest.due) AS due')
            )
            ->join(DB::raw('(
                SELECT student_id, course_id, MAX(id) AS latest_invoice_id
                FROM invoices
                GROUP BY student_id, course_id
            ) as last_invoice'), function($join) {
                $join->on('last_invoice.student_id', '=', 'i.student_id')
                    ->on('last_invoice.course_id', '=', 'i.course_id');
            })
            ->join('invoices as latest', 'latest.id', '=', 'last_invoice.latest_invoice_id')
            ->join('students as s', 's.id', '=', 'i.student_id');

        // Optional date filter
        if (!empty($fromDate) && !empty($toDate)) {
            $query->whereBetween('i.created_at', [$fromDate, $toDate]);
        }
        

        $query->groupBy('s.student_number', 'i.course_id');

        return $query->get();
    }
    
    public function paymentEmail($id){


        $branchId = Auth::user()->branch_id;
        $branch = Branch::whereId($branchId)->first(); 
        
        $payment = Invoice::query()
            ->with([
                'receivedByUser','course','bank','student' => function ($q) {
                    $q->with(['contact_person']);
                 },
                 'enrollment'=>function($e){
                       $e->with('course');
                 }
            ])->findorfail($id);
        $payment->amount_in_words = StudentHelper::convertNumberToWord($payment->amount);
        // return view('pdf.invoice',compact('payment'));
      

    // Send email
    
    Mail::to($payment->student->email)->send(new InvoiceMail($payment, $branch));

    return back()->with('success', 'Invoice emailed successfully!');

    }
}
