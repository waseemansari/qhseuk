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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number', 50);
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('course_id');
            $table->double('course_fee', 10, 2);
            $table->longText('description');
            $table->double('tax', 10, 2)->default(0.00);
            $table->double('discount', 10, 2)->default(0.00);
            $table->double('amount', 10, 2)->default(0.00);
            $table->double('amount_paid', 10, 2)->default(0.00);
            $table->double('due', 10, 2)->default(0.00);
            $table->date('due_date')->nullable();
            $table->string('payment_method');
            $table->enum('status',['paid','unpaid','partial'])->nullable()->comment('paid or unpaid');
            $table->string('received_by', 50);
            $table->tinyInteger('bank_id')->nullable();
            $table->date('exam_date', 50)->nullable();
            $table->string('category', 50)->nullable();
            $table->tinyInteger('enroll_id');
            $table->tinyInteger('branch_id');
            $table->string('attachment')->nullable();
            $table->tinyInteger('acc_status');
            $table->tinyInteger('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
