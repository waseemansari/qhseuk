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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_number');
            $table->longText('name');
            $table->string('trn_number', 255)->nullable();
            $table->string('email', 100);
            $table->string('address', 200)->nullable();
            $table->string('phone');
            $table->string('website', 255); 
            $table->text('country')->nullable();
            $table->string('contact_person', 100)->nullable();
            $table->string('contact_mobile', 100)->nullable();
            $table->string('contact_email', 50)->nullable();
            $table->string('contact_designation', 100)->nullable();
            $table->string('region')->nullable();
            $table->string('details', 100)->nullable();
            $table->longText('remarks')->nullable();
            $table->string('source', 100)->nullable();
            $table->string('random_no')->nullable();

            $table->enum('company_status', ['Set-Appointment','Prospect','Followup', 'Call-back','Send-Email','Enrollement'])->nullable(); 
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('enroll_status', ['enrolled', 'not enrolled'])->default('not enrolled');
            $table->date('action_date')->nullable(); 
            $table->longText('action_notes')->nullable();
            $table->integer('created_by');
            $table->integer('branch_id'); 
            $table->longText('email_file')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->longText('follow_up_msg')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
