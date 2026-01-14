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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->nullable();
            $table->integer('type')->nullable();
            $table->string('country');
            $table->string('city');
            $table->longText('address');
            $table->string('currency');
            
            $table->string('contanct_no');
            $table->string('email');
            $table->string('logo')->nullable();
            $table->string('national_tax')->nullable();
            $table->string('sale_tax')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
