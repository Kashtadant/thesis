<?php

namespace App\Services;

use App\Models\Message;

class CountingService
{
    public static function handle(Message $message)
    {
        $votes = json_decode($message->getAttribute('votes'), true);
        $accepted = $votes['accepted'] ?? [];
        $declined = $votes['declined'] ?? [];

        $participants = json_decode($message->getAttribute('participants'));

        // 1. Если есть участники и голоса
        if ($votes && count($participants) > 0 && count($votes) > 0) {
            // 2. и количество принятых + отклонённых равно количеству участников
            if (count($accepted) + count($declined) === count($participants)) {
                // 3. и принятых больше либо столько же, сколько и отклонённых
                if (count($accepted) >= count($declined)) {
                    // 3. считать предложение принятым
                    $message['result'] = true;
                } else {
                    // 3. в ином случае считать предложение отклонённым
                    $message['result'] = false;
                }
            } else {
                // 2. если количество принятых и отклонённых не равно количеству участников просто отдать сообщение
                return $message;
            }
        } else {
            // 1. если или участников или голосов нет, то просто отдать сообщение
            return $message;
        }

        // отдать сообщение с заполненным полем результата предложения (true или false)
        return $message;
    }
}
