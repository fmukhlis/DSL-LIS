<?php

namespace App\Http\Controllers\InputResult;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class StoreResult extends Controller
{
    public function __invoke(\App\Models\Order $order, \App\Http\Requests\StoreResultRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $result = $order->results()->find($validated['resultID']);

        // Since Laravel-MongoDB library doesn't support "upsert" operation, 
        // we should specifically reset/clear an existing test result record.
        $result->parameterValues->each(function (\App\Models\ParameterValue $parameterValue) {
            $parameterValue->delete();
        });

        $result->parameterValues()->createMany($validated['parameterValues']);

        return back()->with('responseMsg', 'Data saved!');
    }
}
