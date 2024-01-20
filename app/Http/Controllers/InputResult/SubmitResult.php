<?php

namespace App\Http\Controllers\InputResult;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SubmitResult extends Controller
{
    public function __invoke(\App\Models\Order $order): RedirectResponse
    {
        $notFilledAll = $order->results->first(function (\App\Models\Result $result) {
            return $result->parameterValues->first(function (\App\Models\ParameterValue $parameterValue) {
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
