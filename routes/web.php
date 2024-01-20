<?php

use App\Http\Controllers\InputResultController;
use App\Http\Controllers\MasterDataController;
use Illuminate\Http\Request;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StoreOrder;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ValidateResultController;
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


Route::get('/', function (Request $request) {
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

Route::get('/test-result', function () {
    return Inertia::render('TestResult/TestResult');
})->middleware(['auth', 'verified'])->name('testresult');

Route::get('/percobaan-web-php', function (Request $request) {
    return response()->json([
        '$request->user()' => $request->user(),
        'auth()->user()' => auth()->user(),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('/order-test')
        ->group(function () {
            Route::controller(\App\Http\Controllers\OrderTest\ViewController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('order.test');
                    Route::get('/details/{order:registration_id}', 'detail')->name('order.detail');
                });
            Route::controller(\App\Http\Controllers\OrderTest\ManageAnalyst::class)
                ->group(function () {
                    Route::patch('/details/{order:registration_id}/confirm', 'confirm')->name('confirm.order');
                    Route::patch('/details/{order:registration_id}/change', 'change')->name('change.analyst');
                });

            Route::post('/', \App\Http\Controllers\OrderTest\StoreOrder::class);
            Route::patch('/details/{order:registration_id}', \App\Http\Controllers\OrderTest\UpdateOrder::class);
            Route::delete('/details/{order:registration_id}', \App\Http\Controllers\OrderTest\DeleteOrder::class);
        });

    Route::prefix('/input-result')
        ->group(function () {
            Route::controller(\App\Http\Controllers\InputResult\ViewController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('input.result');
                    Route::get('/details/{order:registration_id}', 'detail')->name('input.detail');
                });

            Route::patch('/details/{order:registration_id}', \App\Http\Controllers\InputResult\StoreResult::class);
            Route::post('/details/{order:registration_id}/submit', \App\Http\Controllers\InputResult\SubmitResult::class)->name('submit.result');
        });

    Route::prefix('/validate-result')
        ->group(function () {
            Route::controller(ValidateResultController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('validate.result');
                    Route::get('/details/{order:registration_id}', 'detail')->name('validate.result.detail');
                    Route::post('/details/{order:registration_id}', 'store');
                });
            Route::get('/api', function () {
                $data = Order::whereNotNull('inputted_at')
                    ->whereNull('validated_at')
                    ->with([
                        'results' => ['test'],
                        'patient',
                        'analyst',
                    ])->get();

                return response()->json($data);
            })->name('get.inputted.orders');
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
