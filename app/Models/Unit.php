<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'min_abnormal',
        'max_abnormal',
        'value',
    ];

    public $timestamps = false;

    public function parameter()
    {
        return $this->belongsTo(Parameter::class);
    }
}
