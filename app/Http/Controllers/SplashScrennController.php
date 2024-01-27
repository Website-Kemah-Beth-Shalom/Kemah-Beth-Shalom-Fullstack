<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class SplashScrennController extends Controller
{
    public function showSplashScreen() {
        if (!Cookie::get('splash_screen_shown')) {
            // Set a cookie to track that the splash screen has been shown
            Cookie::queue('splash_screen_shown', true, 30 * 24 * 60); // expiration time -> 30 days (a month)

            return response()->json(['showSplashScreen' => true]);
        }

        return response()->json(['showSplashScreen' => false]);
    }
}
