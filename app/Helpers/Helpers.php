<?php

use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

function getMessage(string $string = '')
{
    return 'Hello ' . $string . '!';
}


// Cache Helper
// function Cache(string $key)
// {
//     $ProductData = Cache::rememberForever($key, function () {
//         $ProductData = new Product();
//         $ProductData = $ProductData->paginate(5);
//         foreach ($ProductData as $product) {
//             $product->image = Storage::url($product->image);
//         }
//         return $ProductData;
//     });
//     return $ProductData;
// }