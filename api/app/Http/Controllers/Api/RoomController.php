<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AddMembersRequest;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\Api\RoomResource;
use App\Http\Resources\Api\UserResource;
use App\Models\Room;
use App\Models\RoomUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Ramsey\Collection\Collection;

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

    public function addMembers(AddMembersRequest $request): AnonymousResourceCollection
    {
        $roomId = request()->route()->parameter('room');
        $userIds = $request->validated()['members'];

        $room = Room::findOrFail($roomId);
        RoomUser::where('room_id', $room->id)->delete();

        foreach (json_decode($userIds) as $userId) {
            $room->users()->attach($userId);
        }

        return UserResource::collection($room->users);
    }
}
