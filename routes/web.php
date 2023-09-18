<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WebconfigController;
use App\Http\Controllers\DocumentationController;
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
Route::get('/documentation', DocumentationController::class)->name('documentation');
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


// fallback route
// Route::fallback(function () {
//     return redirect('/');
// });

require __DIR__ . '/auth.php';
