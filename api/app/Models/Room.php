<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\HasIdentifiableAttribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasIdentifiableAttribute;
    use CrudTrait;

    protected $fillable = [
        'name',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
}
