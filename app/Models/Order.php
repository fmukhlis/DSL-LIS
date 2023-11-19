<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'is_cito',
        'finished_at',
        'inputted_at',
        'validated_at',
        'total_price',
        'payment_method',
        'registration_id',
    ];

    public function tests()
    {
        return $this->belongsToMany(Test::class);
    }

    public function analyst()
    {
        return $this->belongsTo(Analyst::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public static function generateRegID()
    {
        $currentDate = now()->format('ymd');
        $lastRegID = self::where('registration_id', 'like', $currentDate . '%')
            ->orderBy('registration_id', 'desc')
            ->first();
        $sequence = $lastRegID ? intval(Str::after($lastRegID->registration_id, $currentDate)) + 1 : 1;
        $sequencePart = Str::padLeft($sequence, 4, '0');

        return $currentDate . $sequencePart;
    }
}
