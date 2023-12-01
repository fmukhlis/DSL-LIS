<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function parameterValues()
    {
        return $this->embedsMany(ParameterValue::class);
    }
}
