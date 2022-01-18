<?php

use App\Http\Controllers\Admin\ProfileController;
use Illuminate\Support\Facades\Route;

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.

Route::group(
    [
        'namespace'  => 'App\Http\Controllers',
        'middleware' => ['web'],
        'prefix'     => config('backpack.base.route_prefix', '/'),
    ],
    function () {
        Route::get('edit-account-info', [ProfileController::class, 'getAccountInfoForm'])
            ->name('backpack.account.info');

        Route::post('edit-account-info', [ProfileController::class, 'postAccountInfoForm'])
            ->name('backpack.account.info.store');

        Route::post('change-password', [ProfileController::class, 'postChangePasswordForm'])
            ->name('backpack.account.password');
    }
);

Route::group(
    [
        'prefix'     => config('backpack.base.route_prefix', 'admin'),
        'middleware' => array_merge(
            (array)config('backpack.base.web_middleware', 'web'),
            (array)config('backpack.base.middleware_key', 'admin')
        ),
        'namespace'  => 'App\Http\Controllers\Admin',
    ],
    function () { // custom admin routes
        Route::crud('message', 'MessageCrudController');
        Route::crud('room', 'RoomCrudController');
        Route::crud('user', 'UserCrudController');
    }
); // this should be the absolute last line of this file
