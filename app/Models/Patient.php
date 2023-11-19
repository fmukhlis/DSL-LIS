<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'reg_id',
        'job',
        'name',
        'gender',
        'address',
        'religion',
        'date_of_birth',
        'mother_s_name',
        'place_of_birth',
        'marriage_status',
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
