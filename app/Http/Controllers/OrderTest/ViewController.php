<?php

namespace App\Http\Controllers\OrderTest;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;

use App\Models\Order;
use App\Models\Doctor;
use App\Models\Analyst;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ViewController extends Controller
{
    public function index(Request $request): Response
    {
        $unfinishedOrders = Order::whereNotIn('status', ['done']);

        $categories = Category::with('tests')->get();

        $externalDoctors = Doctor::whereNotNull('institution')->get();

        $processedRegID = $unfinishedOrders->get()->map(fn ($unfinishedOrder) => $unfinishedOrder->registration_id);

        if ($request->user()->can('viewAny', \App\Models\Order::class)) {
            $unconfirmedOrders = $unfinishedOrders->where('status', 'need_confirmation')
                ->with([
                    'doctor',
                    'patient' => ['contacts'],
                    'results' => ['test'],
                ])->get();
        } else {
            $department = $request->user()->department;
            $unconfirmedOrders = $unfinishedOrders->where('status', 'need_confirmation')
                ->whereRelation('doctor', 'department', $department)
                ->with([
                    'doctor',
                    'patient' => ['contacts'],
                    'results' => ['test'],
                ])->get();
        }

        return Inertia::render('OrderTest/OrderTest', [
            'categories' => $categories,
            'externalDoctors' => $externalDoctors,
            'unconfirmedOrders' => $unconfirmedOrders,
            'processedRegID' => $processedRegID,
            'can' => [
                'selectExternalDoctor' => $request->user()->role === "sales",
                'viewDetail' => $request->user()->can('view', \App\Models\Order::class),
            ],
        ]);
    }

    public function detail(Order $order): Response
    {
        $this->authorize('view', \App\Models\Order::class);

        return Inertia::render('OrderTest/ConfirmOrder', [
            'analysts' => Analyst::all(),
            'order' => $order->load([
                'doctor',
                'patient' => ['contacts'],
                'results' => ['test'],
            ]),
        ]);
    }
}
