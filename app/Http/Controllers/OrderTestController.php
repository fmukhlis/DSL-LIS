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
use App\Models\Parameter;
use App\Models\ParameterValue;
use App\Models\Result;

class OrderTestController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with([
            'results' => ['test'],
            'patient',
            'doctor' => ['specializations']
        ])->get();

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

        $order->results()->saveMany(
            collect($request->tests)->map(function (string $test_id, int $key) {
                $result = Test::find($test_id)->results()->save(new Result());
                $result->parameterValues()->saveMany(
                    $result->test->parameters->map(function ($parameterInstance, int $key) {
                        return new ParameterValue(['value' => 0, 'parameter_id' => $parameterInstance->_id]);
                    })
                );
                return $result;
            })
        );

        // $order->results()->first()->test->parameters()->first()->parameterValues()->save(
        //     new ParameterValue([
        //         'value' => 0,
        //         'parameter_id' => '12345678',
        //     ])
        // );

        // $order->results->each(function ($resultInstance, int $key) {
        //     $resultInstance->parameterValues()->saveMany(
        //         $resultInstance->test->parameters->map(function ($parameterInstance, int $key) {
        //             return $parameterInstance->parameterValues()->save(
        //                 new ParameterValue(['value' => 0])
        //             );
        //         })
        //     );
        // });

        // $order->tests()->sync(
        //     collect($request->tests)->map(function (string $item, int $key) {
        //         return Test::find($item)->_id;
        //     })->all()
        // );

        $order->total_price = $order->results()->whereIn('test_id', $request->tests)->get()
            ->reduce(function (int $carry, Result $result) {
                return $carry + $result->test->price;
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

        return back()->with('operationResponse', 'Order with ID: ' . $order->registration_id . ' has been created successfully!');
    }

    public function detail(Order $order): Response
    {
        return Inertia::render('OrderTest/ConfirmOrder', [
            'order' => $order->load([
                'results' => ['test'],
                'patient' => ['contacts'],
                'doctor' => [
                    'department',
                    'specializations'
                ],
            ]),
            'analysts' => Analyst::all(),
        ]);
    }

    public function confirm(Order $order, Request $request): RedirectResponse
    {
        $isRedirect = true;

        $request->validate([
            'analyst' => 'required|exists:analysts,_id',
            'pin' => 'required|digits:6',
        ]);

        $analyst = Analyst::find($request->analyst);

        if (Hash::check($request->pin, $analyst->pin)) {
            $isRedirect = $order->confirmed_at === null;
            $order->confirmed_at = now();
            $analyst->orders()->save($order);
        } else {
            return back()->withErrors(['pin' => "PIN not match!"]);
        }

        if ($isRedirect) {
            return redirect()->route('order.test')->with(
                'operationResponse',
                'The order with ID: ' . $order->registration_id . ' has been confirmed by ' . $analyst->name
            );
        }

        return back();
    }
}
