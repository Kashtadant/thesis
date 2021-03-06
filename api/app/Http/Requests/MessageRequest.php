<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'max:255'],
            'votes' => ['json'],
            'participants' => ['json'],
            'file' => [],
            'text' => ['required', 'string', 'max:255'],
            'room_id' => ['integer'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
