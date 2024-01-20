<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'department',
        'institution',
    ];

    public $timestamps = false;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
