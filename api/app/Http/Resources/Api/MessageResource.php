<?php

declare(strict_types=1);

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray($request): array
    {
        if ($this->type == 'poll') {
            return [
                'id'           => $this->id,
                'user_id'      => $this->user_id,
                'room_id'      => $this->room_id,
                'type'         => $this->type,
                'votes'        => $this->votes,
                'text'         => $this->text,
                'participants' => $this->participants,
                'result'       => $this->result,
                'file'         => FileResource::make($this->file()) ?? null,
                'updated_at'   => $this->updated_at,
            ];
        } else {
            return [
                'id'           => $this->id,
                'user_id'      => $this->user_id,
                'room_id'      => $this->room_id,
                'text'         => $this->text,
                'type'         => $this->type,
                'file'         => FileResource::make($this->file()) ?? null,
                'updated_at'   => $this->updated_at,
            ];
        }
    }
}
