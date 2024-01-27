<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use App\Models\Product_add_on;
use App\Models\ProductMaterial;
use App\Models\ProductMaterialItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function ProductDetail($slug)
    {

        $ProductData = Cache::rememberForever('ProductData:' . $slug, function () use ($slug) {
            return Product::where('slug', $slug)->first();
        });

        // forget cache

        if (!$ProductData) {
            return inertia('ErrorPage');
        }


        return inertia('Product/ProductDetailPage', [
            'ProductData' => $ProductData,
        ]);
    }


    // Admin function for Product
    public function AdminPage()
    {
        $product = Product::with('productmaterial')->get();
        return inertia('Admin/Product/AdminProductPage', [
            'Products' => $product,
        ]);
    }


    public function ShowAdminProductDetailPage($id)
    {
        $product = Product::where('id', $id)->with('productmaterial.productmaterialitems')->first();
        return inertia('Admin/Product/AdminProductDetailPage', [
            'Product' => $product,
        ]);
    }


    public function updateProduct(Request $request)
    {
        Validator::make($request->all(), [
            'id' => 'required|exists:products,id',
        ])->validate();


        try {
            $product = Product::where('id', $request->id)->first();
            DB::beginTransaction();
            $product->fill($request->only([
                'name',
                'description',
                'image',
                'price',
            ]));
            $product->save();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'code' => '200',
                'data' => $request->all(),
                'message' => 'Product updated',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'code' => '400',
                'data' => $request->all(),
                'message' => 'Product failed to update',
            ], 400);
        }
    }

    public function DeleteProduct(Product $product, $id)
    {
        Cache::forget('ProductData');
        // $product->DeleteProduct($id);
        $product->where('id', $id)->delete();
        // dd($product);\
        return redirect()->back();
    }

    // public function UpdateProduct(Request $request, Product $product)
    // {
    //     try {
    //         // dd($request->all());
    //         Cache::forget('ProductData:' . $request->slug);
    //         DB::beginTransaction();
    //         $product = Product::where('id', $request->id)->first();
    //         // $add_on = $product->product_add_on; // this is array
    //         // $add_on = $add_on->toArray();
    //         // // update all add on data based on request
    //         // foreach ($add_on as $key => $value) {
    //         //     $add_on[$key]['price'] = $request->add_on[$key]['price'];
    //         //     $add_on[$key]['is_display'] = $request->add_on[$key]['is_display'];
    //         // }
    //         // // dd($add_on);
    //         // $product->product_add_on()->sync($add_on);

    //         // dd($product->product_add_on);
    //         $product->fill($request->only([
    //             'title',
    //             'description',
    //             'image',
    //             'price',
    //             'is_display',

    //         ]));
    //         $product->save();
    //         DB::commit();
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         dd($e);
    //     }
    //     return redirect()->back();
    // }


    public function updateMaterial(Request $request)
    {
        Validator::make($request->all(), [
            'id' => 'required|exists:productmaterials,id',
        ])->validate();

        try {
            $product_material = ProductMaterial::where('id', $request->id)->first();
            DB::beginTransaction();
            $product_material->fill($request->only([
                'name',
                'description',
            ]));
            $product_material->save();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'code' => '200',
                'data' => $request->all(),
                'message' => 'Product material updated',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'code' => '400',
                'data' => $request->all(),
                'message' => 'Product material failed to update',
            ], 400);
        }
    }
    public function addNewMaterial(Request $request, Product $product)
    {
        Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'name' => 'required',
            'description' => 'required',
        ])->validate();

        $product_material = ProductMaterial::create([
            'product_id' => $request->product_id,
            'name' => $request->name,
            'description' => $request->description,
        ]);
        $product_material->save();
        Cache::forget('ProductData');
        return response()->json([
            'status' => 'success',
            'code' => '200',
            'data' => $request->all(),
            'message' => 'Add on created',
        ], 200);
    }



    public function addNewMaterialItem(Request $request, Product $product)
    {
        Validator::make($request->all(), [
            'productmaterial_id' => 'required',
            'name' => 'required',
            'price' => 'required',
        ])->validate();
        try {
            $product_material_item = ProductMaterialItem::create([
                'productmaterial_id' => $request->productmaterial_id,
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
            ]);
            $product_material_item->save();
            Cache::forget('ProductData');
            return response()->json([
                'status' => 'success',
                'code' => '200',
                'data' => $request->all(),
                'message' => 'Add on created',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => '400',
                'data' => $request->all(),
                'error' => $e->getMessage(),
                'message' => 'Add on failed to create',
            ], 400);
        }
    }

    public function updateMaterialItem(Request $request)
    {
        Validator::make($request->all(), [
            'id' => 'required|exists:productmaterialitems,id',
        ])->validate();

        try {
            $product_material_item = ProductMaterialItem::where('id', $request->id)->first();
            DB::beginTransaction();
            $product_material_item->fill($request->only([
                'name',
                'description',
                'price',
            ]));
            $product_material_item->save();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'code' => '200',
                'data' => $request->all(),
                'message' => 'Product material item updated',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'code' => '400',
                'data' => $request->all(),
                'message' => 'Product material item failed to update',
            ], 400);
        }
    }
}
