<?php

namespace Tests\Feature;

//use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testHasCorrectCountOfUsers()
    {
        $usersCount = User::count();
        $response = $this->getJson('/api/users');

        $response->assertOk();
        $response->assertJsonCount($usersCount, "data");
    }

    public function testReturnCorrectUser()
    {
        $user = User::where("email", "=", "bykov@thesis.ru")->first();
        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertOk();
        $response->assertJson(
            [
                'data' => [
                    'id'        => $user->id,
                    'full_name' => 'Владимир Быков',
                    'position'  => 'Документовед',
                    'email'     => 'bykov@thesis.ru',
                ],
            ]
        );
    }
}
