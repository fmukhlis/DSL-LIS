<?php

namespace App\Http\Controllers\InputResult;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use App\Models\Order;
use App\Models\Parameter;

class ViewController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->user()->can('viewAny', \App\Models\Order::class)) {
            $confirmedOrders = Order::where('status', 'input_process')
                ->with([
                    'analyst',
                    'patient',
                    'results' => ['test'],
                ])->get();
        } else {
            $department = auth()->user()->department;
            $confirmedOrders = Order::where('status', 'input_process')
                ->whereRelation('doctor', 'department', $department)
                ->with([
                    'analyst',
                    'patient',
                    'results' => ['test'],
                ])->get();
        }

        return Inertia::render('InputResult/InputResult', [
            'can' => [
                'inputResult' => $request->user()->can('inputResult', \App\Models\Order::class),
            ],
            'confirmedOrders' => $confirmedOrders
        ]);
    }

    public function detail(Order $order): Response
    {
        return Inertia::render('InputResult/InputResultDetail', [
            'analysts' => Analyst::all(),
            'order' => $order->load([
                'results' => ['test' => ['parameters' => ['units']]],
                'patient' => ['contacts'],
                'doctor',
                'results',
                'analyst:name,title',
            ]),
            'parameters' => Parameter::with('units')->get(),
        ]);
    }
}
