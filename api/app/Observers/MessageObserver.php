<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Message;
use App\Services\CountingService;

class MessageObserver
{
    public function retrieved(Message $message): Message
    {
        return CountingService::handle($message);
    }

    public function updated(Message $message)
    {
        $votes = json_decode($message->getAttribute('votes'), true);
        $accepted = $votes['accepted'] ?? [];
        $declined = $votes['declined'] ?? [];

        $participants = json_decode($message->getAttribute('participants'));
        $result = false;

        if ($votes && count($participants) > 0 && count($votes) > 0) {
            if (count($accepted) + count($declined) === count($participants)) {
                if (count($accepted) >= count($declined)) {
                    $result = true;
                } else {
                    $result = false;
                }
            }
        }

        if ($result) {
            $new_result = Message::create(
                [
                    'user_id'      => $message->getAttribute('user_id'),
                    'room_id'      => $message->getAttribute('room_id'),
                    'type'         => 'result',
                    'text'         => $message->getAttribute('text'),
                ]
            );

            $message->file()->copy($new_result, 'file');
        }
    }
}
