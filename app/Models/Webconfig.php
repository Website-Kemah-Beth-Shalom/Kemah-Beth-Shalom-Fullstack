<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Webconfig extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'alias',
        'type',
        'value',
    ];

    public $timestamps = true;

    // protected $casts = [
    //     'value' => 'array',
    // ];

    public function getValueByTitle($title)
    {
        $webconfig = Webconfig::where('title', $title)->first();
        return $webconfig->value;
    }
        
}