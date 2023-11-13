<?php

use App\Http\Controllers\MasterDataController;
use Illuminate\Http\Request;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use App\Models\Category;
use App\Models\Parameter;
use App\Models\Test;
use App\Models\Unit;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/db/parameters', function () {
    $parameters = Parameter::all();
    $data = [
        'total_data' => $parameters->count(),
        'data' => $parameters
    ];
    return response()->json($data);
})->middleware(['auth', 'verified'])->name('get.all.parameter');



// Route::get('/', function () {
//     return Inertia::render('Auth/OldLogin', [
//         'canResetPassword' => Route::has('password.request'),
//         'mongo' => User::all()
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/order-test', function () {
    return Inertia::render('OrderTest/OrderTest');
})->middleware(['auth', 'verified'])->name('ordertest');

Route::get('/input-result', function () {
    return Inertia::render('InputResult/InputResult');
})->middleware(['auth', 'verified'])->name('inputresult');

Route::get('/validate-result', function () {
    return Inertia::render('ValidateResult/ValidateResult');
})->middleware(['auth', 'verified'])->name('validateresult');

Route::get('/test-result', function () {
    return Inertia::render('TestResult/TestResult');
})->middleware(['auth', 'verified'])->name('testresult');











Route::prefix('/settings/master-data')
    ->middleware(['auth', 'verified'])
    ->group(function () {

        Route::get('/', [MasterDataController::class, 'index'])
            ->name('master.data');

        Route::prefix('/staff-management')->group(function () {
            Route::get('/', [MasterDataController::class, 'staff'])
                ->name('staff.management');
        });

        Route::prefix('/test-management')
            ->group(function () {
                Route::get('/', [MasterDataController::class, 'test'])
                    ->name('test.management');

                Route::controller(TestController::class)->group(function () {
                    Route::post('/category', 'storeCategory')
                        ->name('manage.category');

                    Route::post('/test', 'storeTest')
                        ->name('manage.test');

                    Route::post('/parameter', 'storeParameter')
                        ->name('manage.parameter');

                    Route::post('/unit', 'storeUnit')
                        ->name('manage.unit');
                });
            });
    });


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
