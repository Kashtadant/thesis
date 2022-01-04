<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Api\Auth\UserResource;
use App\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    /**
     * @throws \Exception
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $token = $user->createToken('auth')->plainTextToken;

        return response()->json(
            [
                'user_id'  => $user->id,
                'token' => $token,
            ]
        );
    }

    /**
     * @throws \Throwable
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        $login = Auth::attempt($data);
        $user = Auth::user();

        if (!$login) {
            throw new \App\Services\Auth\Exceptions\UserNotFoundException();
        }

        $token = $user->createToken('auth')->plainTextToken;

        return response()->json(['token' => $token], JsonResponse::HTTP_OK);
    }
}
