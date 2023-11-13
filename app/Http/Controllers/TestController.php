<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

use App\Models\Test;
use App\Models\Unit;
use App\Models\Category;
use App\Models\Parameter;

class TestController extends Controller
{
    public function storeCategory(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:categories,name|string|max:50',
        ]);

        Category::create([
            'name' => $request->name
        ]);

        return back()->with('categoryAddMsg', 'Category created successfully!');
    }

    public function storeTest(Request $request): RedirectResponse
    {
        $request->validate([
            'category' => 'required|exists:categories,_id',
            'name' => 'required|string|max:50',
            'price' => 'required|numeric|min:1000',
            'is_manual' => 'required|boolean'
        ]);

        Category::find($request->category)->tests()->save(
            Test::updateOrCreate(
                ['name' => $request->name],
                [
                    'price' => $request->price,
                    'is_manual' => $request->is_manual,
                ]
            )
        );

        return back()->with('testAddMsg', 'Test added successfully!');
    }

    public function storeParameter(Request $request): RedirectResponse
    {
        $request->validate([
            'test' => 'required|exists:tests,_id',
            'name' => 'required|string|max:50',
        ]);

        $test = Test::find($request->test);
        $parameter = Parameter::firstOrNew(['name' => $request->name]);

        $test->parameters()->save($parameter);
        $parameter->tests()->save($test);

        return back()->with('parameterAddMsg', 'Parameter added successfully!');
    }

    public function storeUnit(Request $request): RedirectResponse
    {
        $request->validate([
            'parameter' => 'required|exists:parameters,_id',
            'name' => 'required|string|max:10',
            'min_abnormal' => 'required|numeric',
            'max_abnormal' => 'required|numeric',
        ]);

        Parameter::find($request->parameter)->units()->save(
            Unit::updateOrCreate(
                ['name' => $request->name],
                [
                    'min_abnormal' => $request->min_abnormal,
                    'max_abnormal' => $request->max_abnormal
                ]
            )
        );

        return back()->with('unitAddMsg', 'Unit added successfully!');
    }
}
