<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
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

    public function detail(\App\Models\Order $order): Response
    {
        return Inertia::render('ValidateResult/ValidateResultDetail', [
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
            'analysts' => \App\Models\Analyst::all()
        ]);
    }

    public function store(\App\Models\Order $order, Request $request): RedirectResponse
    {
        $request->validate([
            'pin' => 'required|exists:validation_pins,pin',
            'feedbacks.*.type' => 'required|string'
        ]);

        $isValid = true;

        foreach ($request->feedbacks as $result_id => $feedback) {
            $result = \App\Models\Result::find($result_id);
            $result->feedback_type = $feedback["type"];
            if ($result->feedback_type === 'disapprove') {
                $isValid = false;
            }
            if ($feedback["comment"]) {
                $result->feedback_comment = $feedback["comment"];
            }

            $result->save();
        }

        if ($isValid) {
            $order->status = 'valid';
            $order->validated_at = now();
        } else {
            $order->status = 'invalid';
        }

        $order->save();

        return redirect()->route('validate.result')->with(
            'operationResponse',
            $isValid
                ? 'The order with ID: ' . $order->registration_id . ' has been validated by ' . $order->analyst->name
                : 'Feedback has been submitted!'
        );
    }
}
