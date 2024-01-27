<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomerBook extends Model
{
    use HasFactory;

    protected $table = 'customerbooks';

    protected $fillable = [
        'name',
        'id',
        'customer_id',
        'note',
    ];
    
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'id', 'customer_id');
    }

    public function customerBookMaterials(): HasMany
    {
        return $this->hasMany(CustomerBookMaterial::class, 'customerbook_id', 'id');
    }
}
