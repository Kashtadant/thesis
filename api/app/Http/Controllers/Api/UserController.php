<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Api\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController
{
    public function index(): AnonymousResourceCollection
    {
        $users = User::all();

        return UserResource::collection($users);
    }

    public function show(): UserResource
    {
        $userId = request()->route()->parameter('user');
        $users = User::findOrFail($userId);

        return UserResource::make($users);
    }

    public function updateAvatar(UpdateUserRequest $request)
    {
        $user = $request->user();
        $avatar = $request->file('avatar');

        $user->clearMediaCollection('avatars');
        $user->addMedia($avatar)->toMediaCollection('avatars');
    }
}
