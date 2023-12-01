<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class ParameterValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'parameter_id',
    ];

    public $timestamps = false;

    public function parameter()
    {
        return $this->embedsOne(Parameter::class);
    }
}
