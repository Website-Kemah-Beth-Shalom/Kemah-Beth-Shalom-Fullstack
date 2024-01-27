<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;
    use SoftDeletes;


    public static $cacheKey = 'blog';
    public static $cacheKeyDetail = 'blog_detail_';

    public $fillable = [
        'id',
        'title',
        'slug',
        'description',
        'image',
        'published',
    ];

    protected $casts = [
        'created_at' => 'datetime:l, Y-m-d H:i:s', // l represents the full day name
        'updated_at' => 'datetime:l, Y-m-d H:i:s'
    ];

    public $timestamps = true;


    // protected static function createUniqueSlug($slug, $excludeId = null)
    // {
    //     $slug = Str::slug($slug);
    //     $count = static::where('slug', 'like', "$slug%")
    //         ->when($excludeId, function ($query) use ($excludeId) {
    //             return $query->where('id', '!=', $excludeId);
    //         })
    //         ->count();
    //     return $count > 0 ? "{$slug}-{$count}" : $slug;
    // }


    protected function Image(): Attribute
    {
        return Attribute::make(
            // convert value to storage link
            // get: fn ($value) => Storage::url($value),
            // set: fn ($value) => Str::slug($value , '.'),

            // make sure slug is unique
        );
    }

    protected function Id(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
        );
    }


    public function Title(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucfirst($value),
        );
    }

    protected function Slug(): Attribute
    {
        return Attribute::make(
            // convert slug to lowercase and remove space with dash
            get: fn ($value) => Str::slug($value),
            set: fn ($value) => Str::slug($value)
        );
    }

    protected function Description(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
        );
    }

    protected function Published(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value ?? false
        );
    }
    // if there is change on blog, cache will be flushed
    protected static function booted()
    {
        // static::creating(function ($blog) {
        //     // make sure slug is always unique
        //     $blog->slug = static::createUniqueSlug($blog->Slug);
        // });

        static::created(function ($blog) {
            Cache::forget('blog');
        });
        static::updated(function ($blog) {
            // forget all cache that start with "blog" key
            Cache::forget('blog');
            Cache::forget('blog_detail_' . $blog->slug);
            Cache::forget('blog_detail_' . $blog->id);
        });
    }
}
