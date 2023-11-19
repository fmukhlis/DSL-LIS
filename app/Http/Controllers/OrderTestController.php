<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Analyst;
use Illuminate\Http\RedirectResponse;


use App\Models\Test;
use App\Models\Order;
use App\Models\Doctor;
use App\Models\Contact;
use App\Models\Patient;
use App\Models\Category;

use Illuminate\Support\Carbon;

class OrderTestController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['tests', 'patient:name', 'doctor' => ['specializations']])
            ->get()
            ->setVisible(['registrationID', 'patientName', 'payment', 'referringPhysician', 'dateTime', 'tests'])
            ->map(function ($item, int $key) {
                $item->registrationID = $item->registration_id;
                $item->patientName = $item->patient->name;
                $item->payment = $item->payment_method;
                $item->referringPhysician = 'Dr. ' . $item->doctor->name . ', ' . $item->doctor->specializations->implode('title', ', ');
                $utcDate = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at, 'UTC');
                $asiaJakartaDate = $utcDate->setTimezone('Asia/Jakarta');
                $item->dateTime = $asiaJakartaDate;

                return $item;
            });

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

        return back()->with('operationResponse', 'Order: ' . $order->_id . ' created!');
    }
}

// $collection->string('note');
// $collection->boolean('is_cito');
// $collection->date('finished_at');
// $collection->date('inputted_at');
// $collection->date('validated_at');
// $collection->integer('total_price');
// $collection->enum('payment_method', ['BPJS', 'Insurance', 'Self-Payment']);
