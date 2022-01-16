<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(
    ['middleware' => 'auth:sanctum'],
    static function () {
        Route::apiResource('rooms', RoomController::class)->only(['index', 'show', 'store']);
        Route::post('rooms/{room}/users', [RoomController::class, 'addMembers']);

        Route::apiResource('messages', MessageController::class);
        Route::get('recent_files', [MessageController::class, 'getRecentFiles']);

        Route::get('user/rooms', [RoomController::class, 'listByUser']);
        Route::post('user/update_avatar', [UserController::class, 'updateAvatar']);
        Route::get(
            '/user',
            function (Request $request) {
                return $request->user();
            }
        );
    }
);

Route::apiResource('users', UserController::class)->only(['index', 'show']);
