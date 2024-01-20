<?php

namespace App\Http\Controllers\OrderTest;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StoreOrder extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'doctor.name' => 'string|required',
            'doctor.department' => 'string|required',

            'externalDoctor._id' => 'string|nullable',
            'externalDoctor.institution' => 'string|nullable|required_with:externalDoctor.name',
            'externalDoctor.name' => 'string|nullable',

            'patient.contacts' => 'array|nullable',
            'patient.name' => 'string|required',
            'patient.patient_id' => 'string|required',
            'patient.registration_id' => 'string|required',

            'is_cito' => 'boolean',

            'note' => 'string|nullable',

            'payment_method' => 'in:Insurance,BPJS,Self-Payment|required',

            'tests' => 'required|array|min:1',
            'tests.*._id' => 'exists:tests,_id',
        ]);

        $this->authorize('create', [\App\Models\Order::class, $request->doctor['department']]);

        // Check if the order is not a duplicate
        if (\App\Models\Order::where('registration_id', $request->patient['registration_id'])->get()->count()) {
            return back();
        }

        $order = new \App\Models\Order(
            [
                'is_cito' => $request->is_cito,
                'note' => $request->note,
                'payment_method' => $request->payment_method,
                'registration_id' => $request->patient['registration_id'],
                'status' => 'need_confirmation',
            ]
        );
        $order->save();

        $order->results()->saveMany(
            collect($request->tests)->map(function ($test) {
                $result = \App\Models\Test::find($test['_id'])->results()->save(new \App\Models\Result());
                $result->parameterValues()->saveMany(
                    $result->test->parameters->map(function ($parameterInstance) {
                        return new \App\Models\ParameterValue(['value' => 0, 'parameter_id' => $parameterInstance->_id]);
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
            ->reduce(function (int $carry, \App\Models\Result $result) {
                return $carry + $result->test->price;
            }, 0);
        $order->save();

        $isExternal = $request->doctor['name'] === "External doctor...";
        if ($isExternal) {
            // If the external doctor is already registered in the database,
            // $request->externalDoctor['id'] will store a specific doctor id
            // that match the particular doctor _id field. 
            // Otherwise it will store an empty string.
            $doctor = \App\Models\Doctor::find($request->externalDoctor['_id']);
            if ($doctor) {
                $doctor->orders()->save($order);
            } else {
                \App\Models\Doctor::create([
                    'name' => $request->externalDoctor['name'],
                    'institution' => $request->externalDoctor['institution'],
                ])->orders()->save($order);
            }
        } else {
            \App\Models\Doctor::firstOrCreate(
                ['name' => $request->doctor['name']],
                ['department' => $request->doctor['department']]
            )->orders()->save($order);
        }

        $patient = \App\Models\Patient::firstOrNew(
            ['patient_id' => $request->patient['patient_id']],
            ['name' => $request->patient['name']]
        );
        $patient->save();

        $patient->contacts()->saveMany(
            collect($request->patient['contacts'])->map(function ($value, $key) {
                return \App\Models\Contact::firstOrNew(
                    ['contact' => $value],
                    ['type' => $key]
                );
            })
        );
        $patient->orders()->save($order);

        return back()->with('operationResponse', 'Order with ID: ' . $order->registration_id . ' has been created successfully!');
    }
}
