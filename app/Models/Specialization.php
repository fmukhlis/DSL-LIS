<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Specialization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title'
    ];

    public $timestamps = false;

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class);
    }
}
