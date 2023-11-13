<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'is_manual',
    ];

    public $timestamps = false;

    public function parameters()
    {
        return $this->belongsToMany(Parameter::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
