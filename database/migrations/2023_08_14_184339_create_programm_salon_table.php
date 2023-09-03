<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('programm_salon', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('programm_id');
            $table->unsignedBigInteger('salon_id');
            $table->timestamps();

            $table->foreign('salon_id')->references('id')->on('salons')->onDelete('cascade');
            $table->foreign('programm_id')->references('id')->on('programms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programm_salon');
    }
};
