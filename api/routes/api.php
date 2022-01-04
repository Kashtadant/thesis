<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(
    [
        'prefix'    => 'auth',
        'namespace' => '\App\Http\Controllers\Api\Auth',
    ],
    static function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);

        Route::group(
            ['middleware' => 'auth:sanctum'],
            static function () {
                Route::post('logout', [AuthController::class, 'logout']);
            }
        );
    }
);
