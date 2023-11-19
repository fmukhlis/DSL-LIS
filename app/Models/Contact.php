<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'contact',
    ];

    public $timestamps = false;

    public function patients()
    {
        return $this->belongsToMany(Patient::class);
    }
}
