<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerBookMaterialItem extends Model
{
    use HasFactory;

    protected $table = 'customerbookmaterialitems';

    protected $fillable = [
        'id',
        'customerbook_id',
        'productmaterialitem_id',
        'quantity',
        'price',
    ];

    public function customerBookMaterial(): BelongsTo
    {
        return $this->belongsTo(CustomerBookMaterial::class, 'id', 'customerbook_id');
    }

    public function productMaterialItem(): BelongsTo
    {
        return $this->belongsTo(ProductMaterialItem::class, 'id', 'productmaterialitem_id');
    }
}