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
}
