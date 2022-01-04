<?php

declare(strict_types=1);

namespace App\Services\Auth\Exceptions;

class UserNotFoundException extends \App\Exceptions\BaseException
{
    public function __construct()
    {
        parent::__construct('User is not found');
    }

    public function getStatusCode(): int
    {
        return 404;
    }
}
