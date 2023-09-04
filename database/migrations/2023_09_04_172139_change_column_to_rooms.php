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
        Schema::table('rooms', function (Blueprint $table) {
            $table->timestamp('time_start', $precision = 0)->change();
            $table->dropColumn('time_end');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
