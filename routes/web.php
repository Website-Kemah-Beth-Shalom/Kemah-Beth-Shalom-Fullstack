<?php

use App\Http\Controllers\AdminBlogController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CalculationController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SplashScrennController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\WebconfigController;
use App\Models\Image;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// general user
// Route::get('/', function () {
//     return Inertia::render('', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', HomeController::class)->name('home');

Route::get('/about', function () {
    return Inertia::render('About/AboutPage');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('Services/ServicesPage');
})->name('services');



Route::get('/testing', function () {
    return Inertia::render('Testing/TestingPage');
})->name('testing');
Route::get('/contact', ContactController::class)->name('contact');

// Route::prefix('product')->group(function () {
//     Route::get('/', [ProductController::class, 'Index'])->name('product');
//     Route::get('/{slug}', [ProductController::class, 'ProductDetail'])->name('product.detail');
// });


Route::get('/gallery', GalleryController::class)->name('gallery');

// prefix /cost
Route::prefix('cost')->group(function () {
    Route::get('/', [CalculationController::class, 'Index'])->name('cost');
    Route::get('/submit', [CalculationController::class, 'SubmitCostPage'])->name('cost.submit');
    Route::post('/submit', [CalculationController::class, 'SubmitData'])->name('cost.submit.data');
});


Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'ShowBlogIndexPage'])->name('blog');
    Route::get('/{blog:slug}', [BlogController::class, 'ShowBlogDetailPage'])->name('blog.show');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// video
Route::get('/video', [VideoController::class, 'index'])->name('video');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/AdminPage');
    })->name('admin.index');


    Route::prefix('admin/order')->group(function () {
        Route::get('/', [OrderController::class, 'Index'])->name('admin.order');
    });


    Route::get('/admin/webconfig', WebconfigController::class)->name('admin.webconfig');
    Route::post('/admin/webconfig', [WebconfigController::class, 'UpdateWebconfig'])->name('admin.webconfig.update');


    Route::prefix('admin/product')->group(function () {
        Route::get('/', [ProductController::class, 'AdminPage'])->name('admin.product');
        Route::get('/detail/{product:id}', [ProductController::class, 'ShowAdminProductDetailPage'])->name('admin.product.show');
        Route::get('/add', [ProductController::class, 'ShowAddProductPage'])->name('admin.product.addpage');
        Route::post('/add', [ProductController::class, 'AddProduct'])->name('admin.product.add');
        Route::get('/edit/{product:slug}', [ProductController::class, 'ShowEditProductPage'])->name('admin.product.editpage');
        Route::patch('/edit', [ProductController::class, 'UpdateProduct'])->name('admin.product.update');
        Route::delete('/delete/{product:slug}', [ProductController::class, 'DeleteProduct'])->name('admin.product.delete');
    });

    // GALLERY
    Route::get('/admin/gallery', [GalleryController::class, 'AdminPage'])->name('admin.gallery');




    // Blog
    Route::prefix('admin/blog')->group(function () {
        Route::get('/', [AdminBlogController::class, 'index'])->name('admin.blog');
        Route::get('/create', [AdminBlogController::class, 'showCreateNewBlogPage'])->name('admin.blog.create');
        Route::get('/detail/{blog:slug}', [AdminBlogController::class, 'showDetailBlog'])->name('admin.blog.show');
        Route::post('/publish', [AdminBlogController::class, 'publishBlog'])->name('admin.blog.editandpublish');
        //blog trash services
        Route::get('/trash', [AdminBlogController::class, 'showBlogTrashPage'])->name('admin.blog.trash');
        Route::post('/trash/{blog:id}/restore', [AdminBlogController::class, 'restoreBlog'])->name('admin.blog.restore');
        Route::post('/trash/{blog:id}/delete', [AdminBlogController::class, 'permanentDeleteBlog'])->name('admin.blog.delete');
    });



    // USER
    Route::prefix('admin/user')->group(function () {
        Route::get('/', [AdminBlogController::class, 'index'])->name('admin.user');
    });
    // Route Testing

    // PROFILE
    Route::get('admin/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('admin/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('admin/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Video Admin
    Route::get('admin/video', [VideoController::class, 'adminIndex'])->name('admin.video');
    Route::get('admin/video/add', [VideoController::class, 'showAddVideoPage'])->name('admin.video.add');
    Route::post('admin/video/add', [VideoController::class, 'addVideo'])->name('admin.video.add');
});



// Post image
Route::post('uploadimage', [ImageController::class, 'uploadImage']);

// Fallback route
Route::fallback(function () {
    return Inertia::render('ErrorPage');
})->name('fallback');

require __DIR__ . '/auth.php';

// Splash Screen route
Route::get('/splash-screen', [SplashScrennController::class, 'showSplashScreen']);
