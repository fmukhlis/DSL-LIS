<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use App\Http\Controllers\Controller;

use App\Models\Order;

class InputResultController extends Controller
{
    public function index(): Response
    {
        $orders = Order::whereNotNull('confirmed_at')
            ->with([
                'tests',
                'patient:name',
                'analyst:name,title'
            ])
            ->select([
                'is_cito',
                'analyst_id',
                'created_at',
                'patient_id',
                'confirmed_at',
                'registration_id',
            ])
            ->get();

        return Inertia::render('InputResult/InputResult', [
            'orders' => $orders
        ]);
    }
}
