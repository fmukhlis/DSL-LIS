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

use function PHPSTORM_META\map;

class OrderTestController extends Controller
{
    public function index(): Response
    {
        $categories = Category::with('tests')->get();

        $externalDoctors = Doctor::whereNotNull('institution')->get();

        $orders = Order::where('status', 'need_confirmation')
            ->with([
                'doctor',
                'patient',
                'results' => ['test'],
            ])->get();

        return Inertia::render('OrderTest/OrderTest', [
            'categories' => $categories,
            'externalDoctors' => $externalDoctors,
            'orders' => $orders,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'doctor.name' => 'string|required',
            'doctor.department' => 'string|required',

            'externalDoctor._id' => 'string|nullable',
            'externalDoctor.institution' => 'string|nullable',
            'externalDoctor.name' => 'string|nullable',

            'patient.id' => 'numeric|required',
            'patient.name' => 'string|required',
            'patient.email' => 'string|nullable',

            'is_cito' => 'boolean',

            'note' => 'string|nullable',

            'payment_method' => 'in:Insurance,BPJS,Self-Payment|required',

            'tests' => 'required|array|min:1',
            'tests.*._id' => 'exists:tests,_id',
        ]);

        $order = new Order(
            [
                'is_cito' => $request->is_cito,
                'note' => $request->note,
                'payment_method' => $request->payment_method,
                'registration_id' => Order::generateRegID(),
                'status' => 'need_confirmation',
            ]
        );

        $order->save();

        $order->results()->saveMany(
            collect($request->tests)->map(function ($test) {
                $result = Test::find($test['_id'])->results()->save(new Result());
                $result->parameterValues()->saveMany(
                    $result->test->parameters->map(function ($parameterInstance) {
                        return new ParameterValue(['value' => 0, 'parameter_id' => $parameterInstance->_id]);
                    })
                );
                return $result;
            })
        );

        $order->total_price = $order->results()
            ->whereIn(
                'test_id',
                collect($request->tests)->map(function ($test) {
                    return $test['_id'];
                })
            )
            ->get()
            ->reduce(function (int $carry, Result $result) {
                return $carry + $result->test->price;
            }, 0);

        $order->save();

        $isExternal = $request->doctor['name'] === "External doctor...";
        if ($isExternal) {
            $doctor = Doctor::find($request->externalDoctor['_id']);
            if ($doctor) {
                $doctor->orders()->save($order);
            } else {
                Doctor::create([
                    'name' => $request->externalDoctor['name'],
                    'institution' => $request->externalDoctor['institution'],
                ])->orders()->save($order);
            }
        } else {
            $doctor = Doctor::firstOrCreate(
                ['name' => $request->doctor['name']],
                ['department' => $request->doctor['department']]
            )->orders()->save($order);
        }

        $patient = Patient::firstOrNew(
            ['reg_id' => $request->patient['id']],
            ['name' => $request->patient['name']]
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
            'analysts' => Analyst::all(),
            'order' => $order->load([
                'doctor' => [
                    'department',
                    'specializations'
                ],
                'patient' => ['contacts'],
                'results' => ['test'],
            ]),
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
            $order->status = 'input_process';
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
