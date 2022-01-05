<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get(
    '/user',
    function (Request $request) {
        return $request->user();
    }
);

Route::group(
    [
        'prefix'    => 'auth',
        'namespace' => '\App\Http\Controllers\Api\Auth',
    ],
    static function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
    }
);

//Route::group(
//    ['middleware' => 'auth:sanctum'],
//    static function () {
//        Route::post('logout', [AuthController::class, 'logout']);
//    }
//);

Route::group(
    ['prefix' => 'message'],
    static function () {
        //
    }
);

Route::resource('users', UserController::class)->only(['index', 'show']);
