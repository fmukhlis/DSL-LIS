<?php

use Illuminate\Http\Request;
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

Route::get('/order-test', function () {
    $data = \App\Models\Order::where('status', 'need_confirmation')
        ->with([
            'doctor',
            'patient',
            'results' => ['test'],
        ])->get();

    return response()->json($data);
})->name('fetch.created.orders');

Route::get('/doctors', function () {
    $data = [
        [
            'name' => "Dr. Lafitte, Sp. A.",
            'department' => 'Outpatient',
        ],
        [
            'name' => "Dr. Eustass Kidd, Sp. BA., Sp. PK.",
            'department' => 'Outpatient',
        ],
        [
            'name' => "Dr. Trafalgar Law, Sp. An.",
            'department' => 'Inpatient',
        ],
        [
            'name' => "Dr. Marshall Teach, Sp. And., Sp. B.",
            'department' => 'Surgical',
        ],
        [
            'name' => "Dr. Tony Chopper, Sp. A.",
            'department' => 'Inpatient',
        ],
        [
            'name' => "Dr. Vegapunk, Sp. BS., Sp. BP., Sp. BM.",
            'department' => 'Surgical',
        ],
    ];

    return response()->json($data);
})->name('fetch.doctors');
