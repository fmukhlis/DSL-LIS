<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/percobaan-api-php', function (Request $request) {
    return "asdasd";
});

Route::middleware('auth:sanctum')->get('/order-test', function () {
    if (auth()->user()->role === 'client') {
        $orders = \App\Models\Order::where('status', 'need_confirmation')
            ->whereRelation('doctor', 'department', auth()->user()->department)
            ->with([
                'doctor',
                'patient' => ['contacts'],
                'results' => ['test'],
            ])->get();
    } else {
        // Other roles have the same behavior
        $orders = \App\Models\Order::where('status', 'need_confirmation')
            ->with([
                'doctor',
                'patient' => ['contacts'],
                'results' => ['test'],
            ])->get();
    }

    return response()->json($orders);
})->name('fetch.created.orders');

Route::get('/input-result', function (Request $request) {
    $user = \App\Models\User::where('username', $request->username)->first();

    if (!$user) {
        return abort(403);
    }

    if ($user->role === 'client') {
        $orders = \App\Models\Order::where('status', 'input_process')
            ->whereRelation('doctor', 'department', $user->department)
            ->with([
                'doctor',
                'patient' => ['contacts'],
                'results' => ['test'],
            ])->get();
    } else {
        // Other roles have the same behavior
        $orders = \App\Models\Order::where('status', 'input_process')
            ->with([
                'doctor',
                'patient' => ['contacts'],
                'results' => ['test'],
            ])->get();
    }

    return response()->json($orders);
})->name('fetch.confirmed.orders');

Route::middleware('auth:sanctum')->get('/doctors', function () {
    $data = collect([
        [
            'name' => "Dr. Lafitte, Sp. A.",
            'department' => 'Outpatient',
        ],
        [
            'name' => "Dr. Eustass Kidd, Sp. BA., Sp. PK.",
            'department' => 'Inpatient',
        ],
        [
            'name' => "Dr. Trafalgar Law, Sp. An.",
            'department' => 'Outpatient',
        ],
        [
            'name' => "Dr. Marshall Teach, Sp. And., Sp. B.",
            'department' => 'Outpatient',
        ],
        [
            'name' => "Dr. Tony Chopper, Sp. A.",
            'department' => 'Inpatient',
        ],
        [
            'name' => "Dr. Vegapunk, Sp. BS., Sp. BP., Sp. BM.",
            'department' => 'Outpatient',
        ],
    ]);

    if (auth()->user()->role === 'client') {
        $data = $data->where('department', auth()->user()->department)->values();
    }

    return response()->json($data);
})->name('fetch.doctors');


Route::middleware('auth:sanctum')->get('/registered-patient', function () {
    $data = collect([
        [
            'name' => "Usopp",
            'patient_id' => '981420719813',
            'registration_id' => '2312250001',
            'contacts' => [
                'email' => 'usop@gmail.com',
                'phone' => '08123456789',
            ],
        ],
        [
            'name' => "Beppo",
            'patient_id' => '912320719122',
            'registration_id' => '2312250002',
            'contacts' => [
                'email' => 'beppo@gmail.com',
            ],
        ],
        [
            'name' => "Helmeppo",
            'patient_id' => '981421231212',
            'registration_id' => '2312250003',
            'contacts' => [
                'phone' => '08987654321',
            ],
        ],
        [
            'name' => "Broggy",
            'patient_id' => '981481919892',
            'registration_id' => '2312250004',
            'contacts' => [
                'email' => 'broggy@gmail.com',
                'phone' => '08192837465',
            ],
        ],
        [
            'name' => "Dorry",
            'patient_id' => '161420719812',
            'registration_id' => '2312250005',
            'contacts' => [],
        ],
        [
            'name' => "Usopp",
            'patient_id' => '981420719813',
            'registration_id' => '2312250006',
            'contacts' => [
                'email' => 'usop@gmail.com',
                'phone' => '08123456789',
            ],
        ],
    ]);

    return response()->json($data);
})->name('fetch.registered.patients');
