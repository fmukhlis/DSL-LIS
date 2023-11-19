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
        Schema::create('patients', function (Blueprint $collection) {
            $collection->string('job');
            $collection->string('name');
            $collection->string('gender');
            $collection->string('address');
            $collection->string('religion');
            $collection->date('date_of_birth');
            $collection->string('mother_s_name');
            $collection->string('place_of_birth');
            $collection->string('marriage_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
