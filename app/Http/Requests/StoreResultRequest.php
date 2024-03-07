<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResultRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('inputResult', \App\Models\Order::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'resultID' => 'required|exists:results,_id',
            'parameterValues' => 'array|min:1',
            'parameterValues.*.value' => 'numeric|gt:0',
            'parameterValues.*.parameter_id' => 'exists:parameters,_id',
        ];
    }
}
