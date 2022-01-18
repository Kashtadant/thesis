<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\HasIdentifiableAttribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use InteractsWithMedia;
    use CrudTrait;
    use HasIdentifiableAttribute;

    protected $fillable = [
        'full_name',
        'position',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class);
    }

    public function avatar()
    {
        return $this->getFirstMediaUrl('avatars');
    }
}
