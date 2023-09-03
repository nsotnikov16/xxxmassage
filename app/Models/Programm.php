<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programm extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = ['name', 'price', 'salons', 'time'];

    public function salons()
    {
        return $this->belongsToMany(Salon::class);
    }
}
