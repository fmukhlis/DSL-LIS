<?php

namespace App\Http\Controllers\InputResult;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;


class StoreResult extends Controller
{
    public function __invoke(\App\Models\Order $order, Request $request): RedirectResponse
    {
        $request->validate([
            'test_id' => 'required|exists:tests,_id',
            'result' => 'array|min:1',
            'result.*.value' => 'numeric',
            'result.*.parameter_id' => 'exists:parameters,_id',
        ]);

        $specificResult = $order->results()->where('test_id', $request->test_id)->first();

        // Since Laravel-MongoDB library doesn't support "upsert" operation, 
        // we should specifically reset/clear an existing test result record.
        $specificResult->parameterValues->each(function ($item, int $key) {
            $item->delete();
        });

        $specificResult->parameterValues()->createMany($request->result);

        return back()->with('operationResponse', 'Data saved!');
    }
}
