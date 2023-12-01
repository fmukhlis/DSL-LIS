<?php

use App\Http\Controllers\InputResultController;
use App\Http\Controllers\MasterDataController;
use App\Http\Controllers\OrderTestController;
use Illuminate\Http\Request;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TestController;
use App\Models\Category;
use App\Models\Doctor;
use App\Models\Order;
use App\Models\Parameter;
use App\Models\Test;
use App\Models\Unit;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\User;
use Illuminate\Support\Carbon;

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
})->middleware(['auth', 'verified'])->name('get.all.parameters');




// Route::get('/', function () {
//     return Inertia::render('Auth/OldLogin', [
//         'canResetPassword' => Route::has('password.request'),
//         'mongo' => User::all()
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::get('/validate-result', function () {
    return Inertia::render('ValidateResult/ValidateResult');
})->middleware(['auth', 'verified'])->name('validateresult');

Route::get('/test-result', function () {
    return Inertia::render('TestResult/TestResult');
})->middleware(['auth', 'verified'])->name('testresult');










Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('/order-test')
        ->group(function () {
            Route::controller(OrderTestController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('order.test');
                    Route::get('/api', function () {
                        $data = Order::whereNull('confirmed_at')
                            ->with([
                                'results' => ['test'],
                                'patient',
                                'doctor' => ['specializations']
                            ])->get();

                        return response()->json($data);
                    })->name('get.created.orders');
                    Route::get('/details/{order:registration_id}', 'detail')->name('order.detail');

                    Route::post('/', 'store');
                    Route::post('/details/{order:registration_id}', 'confirm');
                });
        });

    Route::prefix('/input-result')
        ->group(function () {
            Route::controller(InputResultController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('input.result');
                    Route::get('/details/{order:registration_id}', 'detail')->name('input.result.detail');

                    Route::post('/details/{order:registration_id}', 'store');
                    Route::post('/proceed/{order:registration_id}', 'proceed')->name('input.result.proceed');

                    Route::get('/api', function () {
                        $data = Order::whereNotNull('confirmed_at')
                            ->whereNull('inputted_at')
                            ->with([
                                'results' => ['test'],
                                'patient',
                                'analyst',
                            ])->get();

                        return response()->json($data);
                    })->name('get.confirmed.orders');
                });
        });

    Route::prefix('/settings/master-data')
        ->group(function () {
            Route::get('/', [MasterDataController::class, 'index'])
                ->name('master.data');

            Route::prefix('/staff-management')->group(function () {
                Route::get('/', [MasterDataController::class, 'staff'])
                    ->name('staff.management');

                Route::controller(StaffController::class)->group(function () {
                    Route::post('/department', 'storeDepartment')
                        ->name('manage.department');

                    Route::post('/specialization', 'storeSpecialization')
                        ->name('manage.specialization');

                    Route::post('/doctor', 'storeDoctor')
                        ->name('manage.doctor');

                    Route::post('/analyst', 'storeAnalyst')
                        ->name('manage.analyst');
                });
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
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
