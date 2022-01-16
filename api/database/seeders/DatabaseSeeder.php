<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->createUsers();
        $this->createRooms();
    }

    public function createUsers()
    {
        $user1 = User::create(
            [
                "full_name" => "Владимир Быков",
                "position"  => "Документовед",
                "email"     => "bykov@thesis.ru",
                "password"  => \Hash::make("bykov@thesis.ru"),
            ]
        );
        $user1->addMedia(public_path("seeds/avatars/{$user1->id}.png"))->toMediaCollection(
            'avatars'
        );

        $user2 = User::create(
            [
                "full_name" => "Аня Матвеева",
                "position"  => "Бухгалтер",
                "email"     => "matveeva@thesis.ru",
                "password"  => \Hash::make("matveeva@thesis.ru"),
            ]
        );
        $user2->addMedia(public_path("seeds/avatars/{$user2->id}.png"))->toMediaCollection(
            'avatars'
        );


        $user3 = User::create(
            [
                "full_name" => "Вадим Нестеренко",
                "position"  => "Директор",
                "email"     => "nesterenko@thesis.ru",
                "password"  => \Hash::make("nesterenko@thesis.ru"),
            ]
        );
        $user3->addMedia(public_path("seeds/avatars/{$user3->id}.png"))->toMediaCollection(
            'avatars'
        );


        $user4 = User::create(
            [
                "full_name" => "Денис Соболь",
                "position"  => "Владелец",
                "email"     => "sobol@site.ru",
                "password"  => \Hash::make("sobol@site.ru"),
            ]
        );
        $user4->addMedia(public_path("seeds/avatars/{$user4->id}.png"))->toMediaCollection(
            'avatars'
        );


        $user5 = User::create(
            [
                "full_name" => "Мария Диденко",
                "position"  => "Зам директора",
                "email"     => "didenko@thesis.ru",
                "password"  => \Hash::make("didenko@thesis.ru"),
            ]
        );
        $user5->addMedia(public_path("seeds/avatars/{$user5->id}.png"))->toMediaCollection(
            'avatars'
        );
    }

    public function createRooms()
    {
        $room1 = Room::create(
            [
                'name' => 'Руководящий отдел',
            ]
        );

        foreach (User::all() as $user) {
            $room1->users()->attach($user->id);
        }
    }


}
