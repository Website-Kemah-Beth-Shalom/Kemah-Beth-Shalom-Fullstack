<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class Product extends Model
{
    use HasFactory;


    protected $fillable = [
        'id ',
        'name',
        'description',
        'image',
        'price',
    ];

    public function product_add_on(): HasMany
    {
        return $this->hasMany(Product_add_on::class, 'product_id', 'id');
    }

    public function productMaterial(): HasMany
    {
        return $this->hasMany(ProductMaterial::class, 'product_id', 'id');
    }

    public static function getAllProduct()
    {
        try {
            if (Cache::has('products')) {
                $products = Cache::get('products');
                return $products;
            }
            $products = Product::all();
            Cache::put('products', $products, 10000);
            return $products;
        } catch (\Exception $e) {
            error_log($e);
        }
    }


    // Caching on product
    protected static function booted()
    {
        static::created(function ($blog) {
            Cache::forget('product');
        });
        static::updated(function ($blog) {
            // forget all cache that start with "product" key
            Cache::forget('product');
            Cache::forget('product_detail_' . $blog->slug);
            Cache::forget('product_detail_' . $blog->id);
        });
    }
}
