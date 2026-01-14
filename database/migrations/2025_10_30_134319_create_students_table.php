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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_number', 15)->nullable();
            $table->longText('name');
            $table->string('mobile', 255)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('region', 200)->nullable();
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->string('date_of_birth', 200)->nullable();
            $table->string('whatsapp_number', 255);
            $table->text('address')->nullable();
            $table->string('country', 100)->nullable();
            $table->string('nationality', 100)->nullable();
            $table->string('company', 50)->nullable();
            $table->string('job_position', 100)->nullable();
            $table->tinyInteger('course_id')->nullable();
            $table->string('study_mode', 100)->nullable();
            $table->string('language', 200)->nullable();
            $table->longText('remarks')->nullable();
            $table->string('attachment')->nullable();
            $table->date('registration_date')->nullable();
            $table->string('contact_person')->nullable();
            $table->integer('created_by');
            $table->integer('branch_id');
            $table->enum('student_status', ['Followup', 'Call-back','Send-Email','Enrollement'])->nullable(); 
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('enroll_status', ['enrolled', 'not enrolled'])->default('not enrolled');
            $table->enum('whatsapp_group', ['yes', 'not'])->default('not'); 
            $table->date('follow_up_date')->nullable();
            $table->longText('follow_up_msg')->nullable(); 
            $table->longText('email_file')->nullable(); 
            $table->unique(['whatsapp_number','student_number','email']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
