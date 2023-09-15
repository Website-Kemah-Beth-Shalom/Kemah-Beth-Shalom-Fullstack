<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestimoniController;
use App\Http\Controllers\WebconfigController;
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

Route::get('/contact', ContactController::class)->name('contact');
Route::get('/product', ProductController::class)->name('product');
Route::get('/product/{slug}', [ProductController::class, 'ProductDetail'])->name('product.detail');
Route::get('/testing', WebconfigController::class)->name('testing');
Route::post('/admin/webconfig', [WebconfigController::class, 'UpdateWebconfig'])->name('admin.webconfig.update');
// Route::get('news', NewsController::class)->name('news');


// admin
Route::get('/admin/product', [ProductController::class, 'AdminPage'])->name('admin');
Route::post('/admin/product/{id}', [ProductController::class, 'UpdateProduct'])->name('admin.update.product');
Route::post('/admin/product', [ProductController::class, 'AddProduct'])->name('admin.add');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // for product

    // for profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// deva
Route::get('/admin/testimonies/add', [TestimoniController::class, 'create'])->name('testimoni.add');

// Route::get('/admin/testimonies', [TestimoniController::class, 'index'])->name('admin');
// Route::post('/admin/testimoni', [TestimoniController::class, 'update'])->name('admin.update.testimonies');
// Route::post('/admin/testimonies', [ProductController::class, 'AddProduct'])->name('admin.add');

// percobaan 2
Route::get('/testimonials', [TestimoniController::class, 'index'])->name('testi');
Route::post('/testimonials', [TestimoniController::class, 'store'])->name('testi.add');
Route::post('/testimonials/{id}', [TestimoniController::class, 'update'])->name('testi.update');
Route::delete('/testimonials/{id}', [TestimoniController::class, 'destroy']);

Route::resource('/admin/testimonies', TestimoniController::class);



require __DIR__ . '/auth.php';
