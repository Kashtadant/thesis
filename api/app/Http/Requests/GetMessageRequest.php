<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetMessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type'         => ['string', 'max:255'],
            'votes'        => ['json'],
            'participants' => ['json'],
            'file'         => [],
            'text'         => ['string', 'max:255'],
            'room_id'      => ['integer'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
