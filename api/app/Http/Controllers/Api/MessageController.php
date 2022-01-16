<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\Api\FileResource;
use App\Http\Resources\Api\MessageResource;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MessageController
{
    public function index(): AnonymousResourceCollection
    {
        $messages = Message::all();

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

//    public function update(Request $request, Message $message): Response
//    {
//        //
//    }

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
