<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{


    public function ShowBlogIndexPage()
    {
        $cacheKey = Blog::$cacheKey;

        // $blogs = Blog::where('published', true)->paginate(10);
        // foreach ($blogs as $key => $value) {
        //     $blogs[$key]->preview = strip_tags($value->description);
        // }

        // Check if the blogs data already exists in the cache
        $blogs = Cache::rememberForever($cacheKey, function () {
            return Blog::where('published', true)->paginate(10);
        });

        // Process each blog entry
        foreach ($blogs as $key => $value) {
            $blogs[$key]->preview = strip_tags($value->description);
        }
        return inertia(
            'Blog/BlogPage',
            [
                'Blogs' => $blogs
            ]
        );
    }

    public function ShowBlogDetailPage($slug)
    {
        // $cacheKey = Blog::$cacheKeyDetail . $slug;
        $blog = Blog::where('slug', $slug)->first();

        // if blog not found, render backup page
        if (!$blog) {
            return inertia('Blog/BlogErrorPage');
        }

        return inertia(
            'Blog/BlogDetailPage',
            ['Blog' => $blog]
        );
    }

    public function getAllBlog()
    {
        // $cacheKey = Blog::$cacheKey;
        $blogs = Blog::where('published', true)->paginate(10);
        return response()->json($blogs);
    }

    public function getBlogById($id)
    {
        // $cacheKey = Blog::$cacheKeyDetail . $id;
        $blog = Blog::where('id', $id)->first();
        return response()->json($blog);
    }
}
