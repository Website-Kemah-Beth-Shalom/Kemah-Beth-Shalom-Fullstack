<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Webconfig;
use Inertia\Inertia;

class WebconfigController extends Controller
{
    // public function index()
    // {
    //     // $webconfigs = Webconfig::all();
    //     // return view('webconfig.index', compact('webconfigs'));
    // }

    public function __invoke(Request $request)
    {
        // $webconfigs = Webconfig::where('title', 'company_name')->first();
        // $webconfigs = Webconfig::where('title', 'company_name')->first();
        $webconfigs = Webconfig::all();
        return Inertia('Testing/TestingPage', compact('webconfigs'));
    }
}
