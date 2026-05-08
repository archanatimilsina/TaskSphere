<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class userVerifQueue extends Model
{
    use HasFactory;
    use HasApiTokens;

    protected $table = 'user_verif_queues';
    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
        'phone'
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed'
        ];
    }
}
