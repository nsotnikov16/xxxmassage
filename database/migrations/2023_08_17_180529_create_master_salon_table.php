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
        Schema::create('master_salon', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('master_id');
            $table->unsignedBigInteger('salon_id');

            $table->foreign('salon_id')->references('id')->on('salons')->onDelete('cascade');
            $table->foreign('master_id')->references('id')->on('masters')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_salon');
    }
};
