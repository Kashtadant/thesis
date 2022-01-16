<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddMembersRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'members' => ['required', 'json'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
