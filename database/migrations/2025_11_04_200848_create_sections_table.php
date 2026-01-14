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
        Schema::create('sections', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('teacher_id');
            $table->longText('name');
            $table->longText('nick_name');
            $table->unsignedBigInteger('course_id');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('number_of_days');
            $table->string('week_days', 255);
            $table->string('class_dates', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
