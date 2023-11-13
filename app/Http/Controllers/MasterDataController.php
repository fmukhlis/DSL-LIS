<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Test;
use App\Models\Unit;
use App\Models\Category;
use App\Models\Parameter;

class MasterDataController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('MasterData/MasterData');
    }

    public function test(): Response
    {
        return Inertia::render('TestManagement/TestManagement', [
            'tests' => Test::all(),
            'units' => Unit::all(),
            'categories' => Category::all(),
            'parameters' => Parameter::all()
        ]);
    }

    public function staff(): Response
    {
        return Inertia::render('StaffManagement/StaffManagement');
    }
}
