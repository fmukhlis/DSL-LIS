<?php

namespace App\Http\Controllers\OrderTest;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManageAnalyst extends Controller
{
    public function confirm(\App\Models\Order $order, Request $request): RedirectResponse
    {
        $this->authorize('view', \App\Models\Order::class);

        $request->validate([
            'analyst' => 'required',
            'analyst.value' => 'exists:analysts,_id',
            'pin' => 'required|digits:6',
        ]);

        $analyst = \App\Models\Analyst::find($request->analyst['value']);

        if (Hash::check($request->pin, $analyst->pin)) {
            $order->confirmed_at = now();
            $order->status = 'input_process';
            $analyst->orders()->save($order);
        } else {
            return back()->withErrors(['pin' => "PIN not match!"]);
        }

        return redirect()->route('order.test')->with(
            'operationResponse',
            'The order with ID: ' . $order->registration_id . ' has been confirmed by ' . $analyst->name
        );
    }

    public function change(\App\Models\Order $order, Request $request): RedirectResponse
    {

        return back();
    }
}
