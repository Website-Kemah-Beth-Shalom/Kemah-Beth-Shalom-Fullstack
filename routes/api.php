<?php

use App\Http\Controllers\AdminBlogController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CalculationController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductController;
use App\Jobs\SendEmailJob;
use App\Mail\SendMail;
use App\Models\Webconfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\TestingController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Download CV
Route::get('download-cv', function () {
    try {
        $file = Webconfig::where('title', 'cv')->first()->value;
        // dd($file);
        // log
        // error_log($file);
        $headers = array(
            'Content-Type: application/pdf',
        );
        return response()->json([
            'status' => 'success',
            'message' => 'Download CV',
            'data' => $file,
        ], 200);
    } catch (\Exception $e) {
        dd($e);
    }
});



// blog services
Route::get('blog', [BlogController::class, 'getAllBlog']);
Route::get('blog/{id}', [BlogController::class, 'getBlogById']);
Route::post('blog/saveasdraft', [AdminBlogController::class, 'saveBlogasDraft']);
Route::post('blog/create', [AdminBlogController::class, 'createBlog']);
Route::delete('blog/{id}', [AdminBlogController::class, 'deleteBlog']);
// blog trash services
Route::get('blog/trash/{blog:id}', [AdminBlogController::class, 'restoreBlog']);


// product
Route::get('product', [ProductController::class, 'fetchAllProductData']);
Route::get('product/create', [ProductController::class, 'addNewProduct']);
Route::post('product/update', [ProductController::class, 'updateProduct']);
Route::post('product/material/create', [ProductController::class, 'addNewMaterial']);
Route::post('product/material/update', [ProductController::class, 'updateMaterial']);
// Route::post('product/material/delete', [ProductController::class, 'deleteMaterial']);
Route::post('product/material/item/create', [ProductController::class, 'addNewMaterialItem']);
Route::post('product/material/item/update', [ProductController::class, 'updateMaterialItem']);


// calculation service
Route::post('cost/submit', [CalculationController::class, 'SubmitData']);


// gallery services
Route::get('gallery', [GalleryController::class, 'fetchAllGalleryData']);
Route::get('gallery/{id}', [GalleryController::class, 'fetchGalleryData']);
// Route::post('gallery', [GalleryController::class, 'createGalleryData']);
// Route::post('gallery/{id}', [GalleryController::class, 'updateGalleryData']);
// Route::delete('gallery/{id}', [GalleryController::class, 'deleteGalleryData']);
Route::patch('gallery', [GalleryController::class, 'changeImageStatus']);

// image services
Route::get('image', [ImageController::class, 'getAllImage']);
Route::post('image', [ImageController::class, 'uploadImage']);
Route::post('image/{id}', [ImageController::class, 'updateImage']);
Route::delete('image/{id}', [ImageController::class, 'deleteImage']);
// Upload Image

Route::get('uploadfile', [ImageController::class, 'uploadFile']);

Route::get('test', [TestingController::class, "index"]);
