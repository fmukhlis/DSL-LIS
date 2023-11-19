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
        Schema::create('orders', function (Blueprint $collection) {
            $collection->timestamps();
            $collection->string('note');
            $collection->boolean('is_cito');
            $collection->date('finished_at');
            $collection->date('inputted_at');
            $collection->date('validated_at');
            $collection->integer('total_price');
            $collection->unique('registration_id');
            $collection->enum('payment_method', ['BPJS', 'Insurance', 'Self-Payment']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
