<?php

namespace App\Http\Controllers\OrderTest;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageAnalystRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManageAnalyst extends Controller
{
    public function confirm(\App\Models\Order $order, ManageAnalystRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $analyst = \App\Models\Analyst::find($validated['analyst']['value']);

        if (Hash::check($request->pin, $analyst->pin)) {
            $order->confirmed_at = now();
            $order->status = 'input_process';
            $analyst->orders()->save($order);
        } else {
            return back()->withErrors(['pin' => "PIN not match!"]);
        }

        return redirect()->route('order.test')->with(
            'toastMsg',
            'The order with ID: ' . $order->registration_id . ' has been confirmed by ' . $analyst->name
        );
    }

    public function change(\App\Models\Order $order, ManageAnalystRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $analyst = \App\Models\Analyst::find($validated['analyst']['value']);

        if (Hash::check($request->pin, $analyst->pin)) {
            $order->confirmed_at = now();
            $analyst->orders()->save($order);
        } else {
            return back()->withErrors(['pin' => "PIN not match!"]);
        }

        return back();
    }
}
