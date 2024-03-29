<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCartProduct extends Model
{
    use HasFactory;

    protected $table = 'user_cart_products';

    protected $fillable = [
        'user_id',
        'product_add_on_id',
        'size',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function product_add_on()
    {
        return $this->belongsTo(Product_add_on::class, 'product_add_on_id', 'id');
    }

    // get created_at
    // get updated_at


}
