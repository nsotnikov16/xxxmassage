<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    protected $fillable = ['name', 'description'];

    public function rooms() {
        return self::hasMany(Room::class);
    }

    public function masters() {
        return self::belongsToMany(Master::class);
    }

    public function programms() {
        return self::belongsToMany(Programm::class);
    }
}
