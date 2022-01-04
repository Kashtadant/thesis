<?php

namespace App\Exceptions;

use Illuminate\Contracts\Container\Container;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * A list of custom exception handlers
     *
     * This is an array of callbacks that called for custom exceptions
     * The key must be a name of exception class to render
     *
     * Closure MUST return a response object
     * Passed arguments are instances of (1st) exception and (2nd) request
     *
     * @psalm-var array<\Closure>
     */
    protected array $computedHandlers;

    /**
     * BaseHandler constructor.
     */
    public function __construct(Container $container)
    {
        $this->computedHandlers = \array_merge(
            $this->getInternalHandlers(),
            $this->getCustomHandlers()
        );

        parent::__construct($container);
    }

    /**
     * Returns a list of internal exceptions handlers
     */
    protected function getInternalHandlers(): array
    {
        return [
            JsonRenderable::class => function (JsonRenderable $exception) {
                return $exception->renderAsJson();
            },
        ];
    }

    /**
     * Returns a list of user-defined exception handlers
     * Feel free to put your handlers here, and also you can override internal handlers here
     */
    protected function getCustomHandlers(): array
    {
        return [];
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param \Throwable $e
     * @return \Illuminate\Http\Response | \Symfony\Component\HttpFoundation\Response
     * @throws \Throwable
     */
    public function render($request, \Throwable $e): Response | \Symfony\Component\HttpFoundation\Response
    {
        $needJson = $request->expectsJson() || $this->isApiRequest($request);

        if ($needJson) {
            foreach ($this->computedHandlers as $key => $handler) {
                if ($e instanceof $key) {
                    return $handler($e, $request);
                }
            }
        }

        return parent::render($request, $e);
    }

    /**
     * Determines is request to API route
     */
    private function isApiRequest(Request $request): bool
    {
        if (!$request instanceof Request || null === $request->route()) {
            return false;
        }

        return in_array(
            'api',
            (array) $request->route()->getAction('middleware'),
            true
        );
    }
}
