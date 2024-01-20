<?php

namespace App\Http\Controllers\OrderTest;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DeleteOrder extends Controller
{
    public function __invoke(\App\Models\Order $order, Request $request): RedirectResponse
    {
        $this->authorize('delete', $order);

        \App\Models\Result::destroy($order->results->map(function ($result) {
            return $result->_id;
        }));
        $order->delete();

        return back()->with('operationResponse', 'Order with ID: ' . $order->registration_id . ' has been deleted successfully!');
    }
}
