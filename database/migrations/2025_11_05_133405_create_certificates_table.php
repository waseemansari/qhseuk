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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('student_id', 20);
            $table->date('exam_date')->nullable();
            $table->tinyInteger('course_id');
            $table->string('unit', 50)->nullable(); 
            $table->string('exam_status', 10)->nullable();
            $table->string('certificate_status', 10)->nullable();
            $table->string('certificate_number', 100)->unique()->nullable();
            $table->date('certificate_date')->nullable();
            $table->string('remarks', 100)->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('expiry', 100)->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->text('reason_of_return')->nullable();
            $table->string('collected_by', 100)->nullable();
            $table->string('receiver_name', 100)->nullable();
            $table->string('courier_company')->nullable();
            $table->string('attach_receiver_id', 100)->nullable();
            $table->integer('created_by');
            $table->integer('branch_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
