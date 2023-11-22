<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;

use App\Models\Test;
use App\Models\Order;
use App\Models\Doctor;
use App\Models\Analyst;
use App\Models\Contact;
use App\Models\Patient;
use App\Models\Category;


class OrderTestController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with([
            'tests',
            'patient:name',
            'doctor:name' => ['specializations']
        ])
            ->select([
                'is_cito',
                'doctor_id',
                'created_at',
                'patient_id',
                'confirmed_at',
                'payment_method',
                'registration_id',
            ])
            ->get();

        return Inertia::render('OrderTest/OrderTest', [
            'doctors' => Doctor::with('specializations')->get(),
            'categories' => Category::with('tests')->get(),
            'orders' => $orders,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'is_cito' => 'boolean',
            'note' => 'string|nullable',
            'patient' => 'required|array',
            'tests.*' => 'exists:tests,_id',
            'tests' => 'required|array|min:1',
            'doctor' => 'required|exists:doctors,_id',
            'payment_method' => 'required|in:Insurance,BPJS,Self-Payment'
        ]);

        $order = new Order(
            [
                'note' => $request->note,
                'is_cito' => $request->is_cito,
                'payment_method' => $request->payment_method,
                'registration_id' => Order::generateRegID(),
            ]
        );

        $order->save();

        $order->tests()->sync(
            collect($request->tests)->map(function (string $item, int $key) {
                return Test::find($item)->_id;
            })->all()
        );

        $order->total_price = $order->tests()->whereIn('_id', $request->tests)->get()->reduce(function (int $carry, Test $value) {
            return $carry + $value->price;
        }, 0);

        $order->save();

        Doctor::find($request->doctor)->orders()->save($order);

        $patient = Patient::firstOrNew(
            ['reg_id' => $request->patient['id']],
            [
                'name' => $request->patient['first_name'] . " " . $request->patient['last_name'],
            ]
        );

        $patient->save();

        $patient->contacts()->save(
            Contact::firstOrNew(
                ['contact' => $request->patient['email']],
                ['type' => 'Email']
            )
        );

        $patient->orders()->save($order);

        return back()->with('operationResponse', 'Order with ID:' . $order->_id . ' has been created successfully!');
    }

    public function detail(Order $order): Response
    {
        return Inertia::render('OrderTest/ConfirmOrder', [
            'order' => $order->load([
                'tests', 'patient' => ['contacts'],
                'doctor' => ['department', 'specializations']
            ]),
            'analysts' => Analyst::all()
        ]);
    }

    public function confirm(Order $order, Request $request): RedirectResponse
    {
        $request->validate([
            'analyst' => 'required|exists:analysts,_id',
            'pin' => 'required|digits:6',
        ]);

        $analyst = Analyst::find($request->analyst);

        if (Hash::check($request->pin, $analyst->pin)) {
            $order->confirmed_at = now();
            $analyst->orders()->save($order);
        } else {
            return back()->withErrors(['pin' => "PIN not match!"]);
        }

        return redirect()->route('order.test')->with(
            'operationResponse',
            'The order with ID: ' . $order->registration_id . ' has been confirmed by ' . $analyst->name
        );
    }
}
