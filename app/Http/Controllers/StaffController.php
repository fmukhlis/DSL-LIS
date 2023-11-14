<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

use App\Models\Doctor;
use App\Models\Department;
use App\Models\Specialization;

class StaffController extends Controller
{
    public function storeDepartment(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:departments,name|string|max:50',
        ]);

        Department::create([
            'name' => $request->name
        ]);

        return back()->with('departmentAddMsg', 'Department created successfully!');
    }

    public function storeDoctor(Request $request): RedirectResponse
    {
        $request->validate([
            'array_of_specialization_ids' => 'required|array',
            'array_of_specialization_ids.*' => 'exists:specializations,_id',
            'department_id' => 'required|exists:departments,_id',
            'name' => 'required|string|max:50',
        ]);

        $doctor = Department::find($request->department_id)->doctors()->save(
            Doctor::firstOrNew(['name' => $request->name])
        );

        $doctor->specializations()->sync($request->array_of_specialization_ids);

        return back()->with('doctorAddMsg', 'Doctor added successfully!');
    }

    public function storeSpecialization(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'title' => 'required|string|max:10',
        ]);

        Specialization::create([
            'name' => $request->name,
            'title' => $request->title,
        ]);

        return back()->with('specializationAddMsg', 'Specialization created successfully!');
    }
}
