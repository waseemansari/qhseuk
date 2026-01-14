<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->string('student_number', 15);
            $table->string('days', 50)->nullable();
            $table->integer('vanue')->nullable();
            $table->integer('course_id')->nullable(); 
            $table->integer('session_id')->nullable();
            $table->double('course_fee', 10, 2)->nullable();
            $table->double('bln', 10, 2)->nullable();
            $table->string('exam_type', 10)->nullable();
            $table->date('enrollment_date')->nullable();
            $table->enum('enrollment_status', ['active','inactive'])->nullable('active'); 
            $table->string('attachment', 100)->nullable();
            
            $table->integer('branch_id');
            $table->integer('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
