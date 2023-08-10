<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Webconfig extends Model
{

    // protected $table = 'webconfig';
    use HasFactory;

    public $fillable = [
        'category',
        'title',
        'alias',
        'type',
        'value',
    ];

    public $timestamps = true;
    
    public function getAllData()//with caching
    {
        $key = 'webconfig';
        $webconfig  = new \App\Models\Webconfig();
        if (Cache::has($key)) {
            $webconfig = Cache::get($key);
        } else {
            $webconfig = $webconfig->getAllEntryData();
            Cache::put($key, $webconfig, 10000);
        }
        return $webconfig;
    }

    public function getValueByTitle($title)
    {
        $webconfig = Webconfig::where('title', $title)->first();
        return $webconfig->value;
    }

    public function getAllEntryData()
    {
        $webconfig = Webconfig::all();
        $webconfigdata = [];
        foreach ($webconfig as $key => $value) {
            $webconfigdata[$value->title] = $value->value;
            // $webconfigdata[$value->category][$value->title] = $value-pro>value;
        }
        return $webconfigdata;
    }
}