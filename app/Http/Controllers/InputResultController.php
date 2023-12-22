<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use App\Http\Controllers\Controller;
use App\Models\Analyst;
use App\Models\Order;
use App\Models\Parameter;
use App\Models\ParameterValue;
use App\Models\Result;
use App\Models\Test;
use App\Models\TestResult;
use Illuminate\Http\RedirectResponse;

class InputResultController extends Controller
{
    public function index(): Response
    {
        $orders = Order::whereNotNull('confirmed_at')
            ->whereNull('inputted_at')
            ->with([
                'results' => ['test'],
                'patient',
                'analyst',
            ])->get();

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

    public function store(Order $order, Request $request): RedirectResponse
    {
        $request->validate([
            'test_id' => 'required|exists:tests,_id',
            'result' => 'array|min:1',
            'result.*.value' => 'numeric',
            'result.*.parameter_id' => 'exists:parameters,_id',
        ]);

        $specificResult = $order->results()->where('test_id', $request->test_id)->first();

        // Since Laravel-MongoDB library doesn't support "upsert" operation, 
        // we should specifically reset an existing test result record.
        $specificResult->parameterValues->each(function ($item, int $key) {
            $item->delete();
        });

        $specificResult->parameterValues()->createMany($request->result);

        return back()->with('operationResponse', 'Data saved!');
    }

    public function proceed(Order $order, Request $request): RedirectResponse
    {
        $notFilledAll = $order->results->first(function (Result $result, int $key) {
            return $result->parameterValues->first(function (ParameterValue $parameterValue, int $key) {
                return $parameterValue->value === 0;
            }) !== null;
        });

        if ($notFilledAll) {
            return back();
        }

        $order->inputted_at = now();
        $order->status = 'waiting_for_validation';
        $order->save();

        return redirect()->route('input.result')->with(
            'operationResponse',
            'The order with ID: ' . $order->registration_id . ' has been inputted by ' . $order->analyst->name
        );
    }
}
