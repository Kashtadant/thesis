<?php

declare(strict_types=1);

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'        => $this->id,
            'full_name' => $this->full_name,
            'position'  => $this->position,
            'email'     => $this->email,
            'avatar'    => $this->avatar(),
        ];
    }
}
