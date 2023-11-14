<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function specializations()
    {
        return $this->belongsToMany(Specialization::class);
    }
}
