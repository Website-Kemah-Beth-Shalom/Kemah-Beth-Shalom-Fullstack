<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    //user
    public function __invoke(Product $product)
    {
        $ProductData = $product->ProductCache();
        return inertia('Product/ProductPage', [
            'ProductData' => $ProductData,
        ]);
    }

    public function ProductDetail($slug)
    {
        $ProductData = Product::where('slug', $slug)->first();
        $ProductData->image = Storage::url($ProductData->image);
        return inertia('Product/ProductDetailPage', [
            'ProductData' => $ProductData,
            'title' => 'Product Detail',
        ]);
    }

    // ADMIN FUNCTION
    public function AdminPage(Product $product)
    {

        $ProductData = $product->ProductCache();
        return inertia('Admin/Product/ProductPage', [
            'ProductData' => $ProductData,
        ]);
    }

    public function AddProduct(Request $request, Product $product)
    {
        Cache::forget('ProductData');
        $product->AddProduct($request);
        return redirect()->back();
    }

    public function UpdateProduct(Request $request, Product $product, $id)
    {
        Cache::forget('ProductData');
        $product->UpdateProduct($request);
        return redirect()->back();
    }

    // 
}