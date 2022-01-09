<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RoomRequest;
use App\Http\Resources\Api\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoomController
{
    public function index(): AnonymousResourceCollection
    {
        $rooms = Room::all();

        return RoomResource::collection($rooms);
    }

    public function listByUser(Request $request)
    {
        $user = $request->user();
        $rooms = $user->rooms;

        return RoomResource::collection($rooms);
    }

    public function show(Room $room): RoomResource
    {
        return RoomResource::make($room);
    }

    public function store(RoomRequest $request): RoomResource
    {
        $data = $request->validated();
        $room = Room::create($data);
        $room->users()->attach($request->user());

        return RoomResource::make($room);
    }

    public function addMember(): void
    {
        $roomId = request()->route()->parameter('room');
        $userId = request()->route()->parameter('user');

        $room = Room::findOrFail($roomId);

        if (!$room->users->contains($userId)) {
            $room->users()->attach($userId);
        }
    }
}
