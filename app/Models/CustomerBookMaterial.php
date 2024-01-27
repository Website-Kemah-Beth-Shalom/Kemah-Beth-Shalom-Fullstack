<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomerBookMaterial extends Model
{
    use HasFactory;

    protected $table = 'customerbookmaterials';

    protected $fillable = [
        'id',
        'note',
        'name',
        'customerbook_id',
        'productmaterialitem_id',
        'width',
        'height',
        'length',
        'total',
    ];

    public function customerBook(): BelongsTo
    {
        return $this->belongsTo(CustomerBook::class, 'id', 'customerbook_id');
    }

    public function productMaterialItem(): BelongsTo
    {
        return $this->belongsTo(ProductMaterialItem::class, 'id', 'productmaterialitem_id');
    }

    public function customerBookMaterialItems(): HasMany
    {
        return $this->hasMany(CustomerBookMaterialItem::class, 'customerbookmaterial_id', 'id');
    }

    // get id

    protected function Id(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
        );
    }
}
