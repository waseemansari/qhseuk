<?php

namespace App\Http\Controllers;

use App\Models\Noticeboard;
use Illuminate\Http\Request;
use Auth;
use Inertia\Inertia;
use Inertia\Response;

class NoticeboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $branchId = Auth::user()->branch_id;
        $noticeboards = Noticeboard::query()
            ->with('branch')
            ->with('user')
            ->when($request->status, fn($q, $status) =>
                $q->where('status', $status)
            )
            ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                
            })
            ->where('branch_id', $branchId)
            ->orderBy('id', 'DESC')
            ->paginate(20)
            ->withQueryString(); 

        return Inertia::render('Noticeboard/List', [
            'noticeboards' => $noticeboards,
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
       
        return Inertia::render('Noticeboard/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        Noticeboard::create($validated);
        return redirect()->route('noticeboard.index')->with('success', 'Noticeboard added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Noticeboard $noticeboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Noticeboard $noticeboard)
    {
        return Inertia::render('Noticeboard/Edit', [
                'noticeboard' => $noticeboard,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Noticeboard $noticeboard)
    {
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        noticeboard::update($validated);
        return redirect()->route('noticeboard.index')->with('success', 'Noticeboard added successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Noticeboard $noticeboard)
    {    
        $noticeboard->delete();
        return redirect()->back()->with('success', 'Noticeboard deleted successfully!');
    }

    public function bulkDelete(Request $request)
    {
        
        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            Noticeboard::whereIn('id', $ids)->delete();
            return back()->with('success', 'Selected Noticeboard deleted successfully.');
        }
        return back()->with('error', 'No Noticeboard selected.');
        
    }
}
