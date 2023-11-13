<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Parameter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    public function tests()
    {
        return $this->belongsToMany(Test::class);
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }
}
