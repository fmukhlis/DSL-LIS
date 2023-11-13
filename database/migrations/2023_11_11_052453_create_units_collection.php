<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use MongoDB\Laravel\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('units', function (Blueprint $collection) {
            $collection->string('name');
            $collection->decimal('min_abnormal', $precision = 8, $scale = 2);
            $collection->decimal('max_abnormal', $precision = 8, $scale = 2);
            $collection->decimal('value', $precision = 8, $scale = 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
