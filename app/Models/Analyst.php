<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Analyst extends Model
{
    use HasFactory;

    protected $fillable = [
        'pin',
        'name',
        'title',
        'signature',
    ];

    public $timestamps = false;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
