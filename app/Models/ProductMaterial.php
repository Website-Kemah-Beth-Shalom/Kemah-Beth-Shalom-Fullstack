<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class ProductMaterial extends Model
{
    use HasFactory;

    protected $table = 'productmaterials';

    protected $fillable = [
        'id',
        'name',
        'description',
        'product_id',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'id', 'product_id');
    }

    public function productMaterialItems(): HasMany
    {
        return $this->hasMany(ProductMaterialItem::class, 'productmaterial_id', 'id');
    }

    // Caching on product material
    protected static function booted()
    {
        static::created(function ($blog) {
            Cache::forget('product');
        });
        static::updated(function ($blog) {
            // forget all cache that start with "product" key
            Cache::forget('product');
            // Cache::forget('product_detail_' . $blog->slug);
            // Cache::forget('product_detail_' . $blog->id);
        });
    }
}
