<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Cache;

class ProductMaterialItem extends Model
{
    use HasFactory;

    protected $table = 'productmaterialitems';

    protected $fillable = [
        'id',
        'productmaterial_id',
        'name',
        'description',
        'image',
        'price',
    ];

    public function productMaterial(): BelongsTo
    {
        return $this->belongsTo(ProductMaterial::class, 'id', 'productmaterial_id');
    }

    // Caching on product material
    protected static function booted()
    {
        static::created(function () {
            Cache::forget('product');
        });
        static::updated(function () {
            // forget all cache that start with "product" key
            Cache::forget('product');
            // Cache::forget('product_detail_' . $blog->slug);
            // Cache::forget('product_detail_' . $blog->id);
        });
    }
}
