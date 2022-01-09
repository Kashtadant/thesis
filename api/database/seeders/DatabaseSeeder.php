<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
//        $this->createUsers();
        $this->createRooms();
    }

    public function createUsers()
    {
        User::create(
            [
                "full_name" => "Владимир Быков",
                "position"  => "Документовед",
                "email"     => "bykov@thesis.ru",
                "password"  => \Hash::make("bykov@thesis.ru"),
            ]
        );

        User::create(
            [
                "full_name" => "Аня Матвеева",
                "position"  => "Бухгалтер",
                "email"     => "matveeva@thesis.ru",
                "password"  => \Hash::make("matveeva@thesis.ru"),
            ]
        );

        User::create(
            [
                "full_name" => "Вадим Нестеренко",
                "position"  => "Директор",
                "email"     => "nesterenko@thesis.ru",
                "password"  => \Hash::make("nesterenko@thesis.ru"),
            ]
        );

        User::create(
            [
                "full_name" => "Денис Соболь",
                "position"  => "Владелец",
                "email"     => "sobol@site.ru",
                "password"  => \Hash::make("sobol@site.ru"),
            ]
        );

        User::create(
            [
                "full_name" => "Мария Диденко",
                "position"  => "Зам директора",
                "email"     => "didenko@thesis.ru",
                "password"  => \Hash::make("didenko@thesis.ru"),
            ]
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
            $room1->users()->create([$user->id])->save();
        }
    }
}
