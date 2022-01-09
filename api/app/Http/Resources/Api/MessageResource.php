<?php

declare(strict_types=1);

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'user_id'    => $this->user_id,
            'room_id'    => $this->room_id,
            'type'       => $this->type,
            'additions'  => $this->additions,
            'text'       => $this->text,
            'created_at' => $this->created_at,
        ];
    }
}
