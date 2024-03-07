<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ManageAnalystRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('view', \App\Models\Order::class);
    }

    /**
     * Get custom attributes for validator errors
     * 
     * @return array<string, string> 
     */
    public function attributes(): array
    {
        return [
            'analyst.value' => 'analyst',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'analyst' => 'required|array',
            'analyst.value' => 'exists:analysts,_id',
            'pin' => 'required|digits:6'
        ];
    }
}
