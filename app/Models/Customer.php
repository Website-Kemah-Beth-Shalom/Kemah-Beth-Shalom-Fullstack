<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Customer extends Model
{
    use HasFactory;
    use Notifiable;
    protected $table = "customers";

    protected $fillable = [
        'id',
        'name',
        'email',
        'address',
        'phone',
    ];

    public function customerBooks(): HasMany
    {
        return $this->hasMany(CustomerBook::class, 'customer_id', 'id');
    }
}   