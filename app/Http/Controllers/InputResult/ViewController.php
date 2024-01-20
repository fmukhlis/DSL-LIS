<?php

namespace App\Http\Controllers\InputResult;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use App\Models\Order;

class ViewController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->user()->can('viewAny', \App\Models\Order::class)) {
            $orders = Order::where('status', 'input_process')
                ->with([
                    'results' => ['test'],
                    'patient',
                    'analyst',
                ])->get();
        } else {
            $department = auth()->user()->department;
            $orders = Order::where('status', 'input_process')
                ->whereRelation('doctor', 'department', $department)
                ->with([
                    'results' => ['test'],
                    'patient',
                    'analyst',
                ])->get();
        }

        return Inertia::render('InputResult/InputResult', [
            'orders' => $orders
        ]);
    }

    public function detail(Order $order): Response
    {
        return Inertia::render('InputResult/InputResultDetail', [
            'order' => $order->load([
                'results' => ['test' => ['parameters' => ['units']]],
                'patient' => ['contacts'],
                'doctor' => [
                    'department',
                    'specializations'
                ],
                'results',
                'analyst:name,title',
            ]),
            'analysts' => Analyst::all()
        ]);
    }
}
