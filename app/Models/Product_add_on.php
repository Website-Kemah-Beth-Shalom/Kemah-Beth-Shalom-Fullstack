<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product_add_on extends Model
{

    use HasFactory;


    protected $table = 'product_add_ons';

    protected $fillable = [
        'product_id',
        'name',
        'price',
        'description',
        'image'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'id', 'product_id');
    }

    // product_id attribute
    protected function ProductId(): BelongsTo
    {
        return BelongsTo::make('product_id');
    }

    protected function Image(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => $value,
        );
    }
}
