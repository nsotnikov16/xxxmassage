<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $fillable = ['name', 'salon_id'];

    protected $attributes = [
        'status' => 0,
        'time_start' => '2023-01-01 00:00:00',
        'salon_id' => 0,
        'programm_id' => 0
    ];

    public function salon()
    {
        return $this->belongsTo(Salon::class);
    }

    public function programm()
    {
        return $this->belongsTo(Programm::class);
    }
}
