<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'avatar' => ['required', 'mimes:jpg,jpeg,png,bmp'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
