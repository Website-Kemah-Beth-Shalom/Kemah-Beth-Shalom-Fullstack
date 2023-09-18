<?php

namespace App\Http\Controllers;

use App\Models\Webconfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentationController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Documentation/DocumentationPage');
    }
}