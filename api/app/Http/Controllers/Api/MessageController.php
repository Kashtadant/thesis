<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\Api\FileResource;
use App\Http\Resources\Api\MessageResource;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MessageController
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $roomId = request()->route()->parameter('room');
        $messages = Message::whereRoomId($roomId)->orderBy('created_at')->get();

        return MessageResource::collection($messages);
    }

    public function store(MessageRequest $request): MessageResource
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $message = Message::create($data);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $message->addMedia($file)->toMediaCollection('file');
        }

        return MessageResource::make($message);
    }

    public function show(Message $message): MessageResource
    {
        return MessageResource::make($message);
    }

    public function accept(Message $message): MessageResource
    {
        $user = request()->user();
        $votes = json_decode($message->getAttribute('votes'), true);

        if (!in_array($user->id, $votes['accepted']) && !in_array($user->id, $votes['declined'])) {
            $votes['accepted'][] = $user->id;
            $message->setAttribute('votes', json_encode($votes));
            $message->save();
        }

        $message = Message::findOrFail($message->id);

        return MessageResource::make($message);
    }

    public function decline(Message $message)
    {
        $user = request()->user();
        $votes = json_decode($message->getAttribute('votes'), true);

        if (!in_array($user->id, $votes['accepted']) && !in_array($user->id, $votes['declined'])) {
            $votes['declined'][] = $user->id;
            $message->setAttribute('votes', json_encode($votes));
            $message->save();
        }

        $message = Message::findOrFail($message->id);

        return MessageResource::make($message);
    }

    public function destroy(Message $message): JsonResponse
    {
        $message->delete();

        return response()->json([], 204);
    }

    public function getRecentFiles(): AnonymousResourceCollection
    {
        $files = Media::where('collection_name', 'file')->limit(7)->get();

        return FileResource::collection($files);
    }
}
