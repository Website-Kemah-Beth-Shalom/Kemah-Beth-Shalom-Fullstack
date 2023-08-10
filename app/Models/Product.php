<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'price',
        // 'stock',
    ];

    public $timestamps = true;

    



    public function ProductCache()
    {
        $ProductData = Cache::rememberForever('ProductData', function () {
            $ProductData = new Product();
            $ProductData = $ProductData->paginate(5);
            foreach ($ProductData as $product) {
                $product->image = Storage::url($product->image);
            }
            return $ProductData;
        });
        return $ProductData;
    }




    public function AddProduct($request)
    {
        $product = new Product();
        // image handler with storage link
        $image_name = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name =   pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $request->file('image'),
                $image_name
            );
            $product->image = $image_name;
        }

        $product->fill($request->only([
            'title',
            'slug',
            'description',
            'image',
            'price',
            // 'stock',
        ]));
        $product->image = $image_name;
        $product->save();
    }

    // public function UpdateProduct($request)
    // {
    //     // find product or create a new one\
    //     error_log($request->id);
    //     $product = $this->find($request->id);
    //     $image_name = null;
    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
    //         Storage::putFileAs(
    //             'public',
    //             $request->file('image'),
    //             $image_name
    //         );
    //     }
    //     // error_log($image_name);
    //     $product->update([
    //         'title' => $request->title,
    //         'slug' => $request->slug,
    //         'description' => $request->description,
    //         'image' => $image_name,
    //         'price' => $request->price,
    //     ]);

    //     // if the image was updated, update the model's image attribute
    //     // if ($request->hasFile('image')) {
    //     //     $product->image = $this->uploadImage($request->file('image'));
    //     // }

    //     $product->save();

    //     // return $product;
    //     return redirect()->back();
    // }

    public function UpdateProduct($request)
    {
        // dd($request);        
        $product = $this->find($request->id);
        // if (!$product) {
        // }
        $product->title = $request->title;
        $product->slug = $request->slug;
        $product->description = $request->description;
        $product->price = $request->price;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name =   pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $request->file('image'),
                $image_name
            );
            $product->image = $image_name;
        }
        $product->save();
    }






    private function uploadImage($image)
    {
        if ($image) {
            $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $image,
                $image_name
            );

            return $image_name;
        }

        return null;
    }
}