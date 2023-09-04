<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Master extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = ['name', 'salons', 'description'];

    protected $attributes = [
        'room_id' => 0
    ];
    public function salons()
    {
        return $this->belongsToMany(Salon::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
