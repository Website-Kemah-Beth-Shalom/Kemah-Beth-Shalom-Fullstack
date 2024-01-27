<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasFactory;

    // db is galleryimages
    protected $table = 'galleryimages';

    protected $fillable = [
        'title',
        'image_id',
    ];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
