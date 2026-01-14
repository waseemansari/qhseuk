<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\User\{RoleController,StudentManagementcontroller,UserContoller,SectionController};
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\{
    ProfileController,CourseController,
    EnrollmentController,CertificateController,
    NoticeboardController,PaymentController,BranchController
};

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/register/pakistan', [RegisteredUserController::class, 'create'])->name('register');

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //student
    Route::resource('student', StudentManagementcontroller::class);
    Route::post('/student/bulk-delete', [StudentManagementcontroller::class, 'bulkDelete'])->name('student.bulkDelete');
    Route::post('/student/enrollElearning', [StudentManagementcontroller::class, 'EnrollElearning'])->name('student.enrollElearning');

    //student
    Route::resource('enrollment', EnrollmentController::class);
    Route::post('/enrollment/bulk-delete', [EnrollmentController::class, 'bulkDelete'])->name('enrollment.bulkDelete');
    //course
    Route::resource('course', CourseController::class);
    Route::post('/course/bulk-delete', [CourseController::class, 'bulkDelete'])->name('course.bulkDelete');


    Route::resource('certificate', CertificateController::class);
    Route::post('/certificate/bulk-delete', [CertificateController::class, 'bulkDelete'])->name('certificate.bulkDelete');
    Route::post('resed_email/certificate/{id}', [CertificateController::class, 'resent_email'])->name('certificate.resed_email');
    Route::get('certificate-follow-up', [CertificateController::class, 'CertificateFollowUp'])->name('certificate.certificate-follow-up');

     //course
    Route::resource('batch', SectionController::class);
    Route::post('/batch/bulk-delete', [SectionController::class, 'bulkDelete'])->name('batch.bulkDelete');

    //Noticeboard
    Route::resource('noticeboard', NoticeboardController::class);
    Route::post('/noticeboard/bulk-delete', [NoticeboardController::class, 'bulkDelete'])->name('noticeboard.bulkDelete');

    //company
    Route::resource('company', CompanyController::class);
    Route::post('/company/bulk-delete', [CompanyController::class, 'bulkDelete'])->name('company.bulkDelete');

    //payment
    Route::resource('payment', PaymentController::class);
    
    Route::get('payment-email/{id}', [PaymentController::class,'paymentEmail']);

    Route::get('create-student-payment/{id}', [PaymentController::class,'create']);
    Route::get('/student-payment/{studentid}/{id?}/courses', [PaymentController::class, 'getCourses']);
     ///admin
    Route::resource('user-management', UserContoller::class);
    Route::resource('role', RoleController::class);
    Route::post('asign-permission/{role}', [RoleController::class,'AsignPermission']);

    Route::resource('branch', BranchController::class);
});

 
Route::post('student-store', [StudentManagementcontroller::class,'store'])->name('save.student');

Route::get('course-detail/{courseId}', [CourseController::class,'show'])->name('course.detail');

Route::post('course-data', [CourseController::class,'courseData'])->name('course.course-data');

require __DIR__.'/auth.php';
