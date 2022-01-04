<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;

use function response;

/**
 * Class BaseException
 *
 * Base exception class which is JsonRenderable and can output result as JsonResponse
 */
abstract class BaseException extends \RuntimeException implements JsonRenderable
{
    /**
     * Data to render in response
     */
    private mixed $data;

    public function __construct(
        string $message = '',
        mixed $data = null,
        int $code = 0,
        \Throwable $previous = null
    ) {
        $this->data = $data;

        parent::__construct($message, $code, $previous);
    }

    public function renderAsJson(): JsonResponse
    {
        return response()->json(
            [
                'message' => $this->getMessage(),
                'data' => $this->getData(),
            ],
            $this->getStatusCode()
        );
    }

    public function getData(): mixed
    {
        return $this->data;
    }

    public function getStatusCode(): int
    {
        return 500;
    }
}
