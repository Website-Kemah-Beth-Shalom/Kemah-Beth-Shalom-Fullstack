<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class TestimoniModel extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'description',
    ];

    public $timestamps = true;

    public function getAllData()//with caching
    {
        $key = 'testimoni';
        $testimoni = new \App\Models\TestimoniModel();
        if (Cache::has($key)){
            $testimoni = Cache::get($key);
        } else {
            $testimoni = $testimoni->getAllEntryData();
            Cache::put($key, $testimoni, 10000);
        }
        return $testimoni;
    }

    public function getValueByTitle($id)
    {
        $testimoni = TestimoniModel::where('id', $id)->first();
        return $testimoni->value;
    }

    public function getAllEntryData()
    {
        $testimoni = TestimoniModel::all();
        $testimonidata = [];
        foreach ($testimoni as $key => $description) {
            $testimonidata[$description->title] = $description->value;
            // $testimonidata[$value->category][$value->title] = $value-pro>value;
        }
        return $testimonidata;
    }

    public function store($request){
        $testimoni = new TestimoniModel();
        $testimoni->fill($request->only([
            'name',
            'description'
        ]));
        $testimoni->save();
    }
}
