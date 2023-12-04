<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ValidateResultController extends Controller
{
    public function index(): Response
    {
        $orders = \App\Models\Order::whereNotNull('inputted_at')
            ->whereNull('validated_at')
            ->with([
                'results' => ['test'],
                'patient',
                'analyst',
            ])->get();

        return Inertia::render('ValidateResult/ValidateResult', [
            'orders' => $orders
        ]);
    }
}
