<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

use App\Models\Order;

class InputResultController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['tests', 'patient:name', 'analyst:name,title'])
            ->select('registration_id', 'is_cito', 'updated_at', 'created_at')
            ->get();

        return Inertia::render('InputResult/InputResult', [
            'orders' => $orders
        ]);
    }
}
