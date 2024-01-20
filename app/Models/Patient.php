<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'name',
    ];

    public $timestamps = false;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function contacts()
    {
        return $this->belongsToMany(Contact::class);
    }
}
