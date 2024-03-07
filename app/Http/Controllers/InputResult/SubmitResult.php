<?php

namespace App\Http\Controllers\InputResult;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SubmitResult extends Controller
{
    public function __invoke(\App\Models\Order $order): RedirectResponse
    {
        // Ensure all parameters have been filled up
        $invalidResults = $order->results->filter(fn (\App\Models\Result $result) => (
            $result->parameterValues->contains(fn (\App\Models\ParameterValue $parameterValue) => (
                $parameterValue->value <= 0
            ))
        ));

        $invalidResultIDs = $invalidResults->map(fn (\App\Models\Result $result) => ([
            $result->_id => 'Invalid result value.'
        ]))->flatMap(fn ($resultArr) => $resultArr)->all();

        if ($invalidResults->count()) {
            return back()->withErrors(
                $invalidResultIDs
            );
        }

        $order->inputted_at = now();
        $order->status = 'waiting_for_validation';
        $order->save();

        return redirect()->route('input.result')->with(
            'toastMsg',
            'The order with ID: ' . $order->registration_id . ' has been inputted by ' . $order->analyst->name
        );
    }
}
