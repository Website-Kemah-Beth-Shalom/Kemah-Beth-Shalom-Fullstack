<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessSiteMap;
use App\Models\Blog;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class AdminBlogController extends Controller
{
    public function index()
    {
        $blog = Blog::paginate(10);
        // add preview
        foreach ($blog as $key => $value) {
            $blog[$key]->preview = strip_tags($value->description);
        }
        return inertia(
            'Admin/Blog/AdminBlogPage',
            [
                'Blogs' => $blog
            ]
        );
    }


    public function showDetailBlog($id)
    {
        // $blog = Blog::find($id)->first(); find or fail
        $blog = Blog::where('id', $id)->first();
        // if (!$blog) {
        //     return redirect()->route('fallback');
        // }
        return inertia(
            'Admin/Blog/Detail/AdminBlogDetailPage',
            [
                'Blog' => $blog

            ]
        );
    }

    // public function publishBlog($id)
    // {
    //     $blog = Blog::find($id);
    //     $status = $blog->published;
    //     if ($status == true) {
    //         $blog->published = false;
    //     } else {
    //         $blog->published = true;
    //     }
    //     $blog->save();
    //     return redirect()->back();
    // }

    public function publishBlog(Request $request)
    {
        // check if id was passed
        try {
            // check if title is unique, if not add number
            if ($request->has('title')) {
                $title = $request->title;
                $count = Blog::where('title', 'like', "$title%")->count();
                if ($count > 0) {
                    $count = $count + 1;
                    $title = "{$title} {$count}";
                }
                $request->merge([
                    'title' => $title,
                ]);
            }
            // check if slug is unique, if not add number
            if ($request->has('slug')) {
                $slug = $request->slug;
                $count = Blog::where('slug', 'like', "$slug%")->count();
                if ($count > 0) {
                    $slug = "{$slug}-{$count}";
                }
                $request->merge([
                    'slug' => $slug,
                ]);
            }
            DB::beginTransaction();
            if ($request->id) {
                $blog = Blog::where('id', $request->id)->first();
                $blog->fill($request->only([
                    'title',
                    'slug',
                    'description',
                    'category',
                    'image'
                ]));
                $blog->published = 1;
                $blog->save();
            } else {
                $blog = Blog::create([
                    'title' => $request->title,
                    'slug' => $request->slug,
                    'description' => $request->description,
                    'published' => 1,
                    'category' => $request->category,
                    'image' => $request->image,
                ]);
            }
            DB::commit();
            
            // call job to generate sitemap for blog
            dispatch(new ProcessSiteMap());
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            //return inertia error bag
            return redirect()->back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
        return redirect()->back();
    }

    public function showCreateNewBlogPage()
    {
        return inertia(
            'Admin/Blog/Detail/AdminBlogDetailPage',
        );
    }

    public function createBlog(Request $request)
    {
        try {
            DB::beginTransaction();
            $blog = Blog::create([
                'title' => $request->title,
                'slug' => $request->slug,
                'description' => $request->description,
                'published' => 0,
                'category' => $request->category,
                'image' => $request->image,
            ]);
            DB::commit();
            return response()->json([
                'message' => 'success!',
                'data' => $blog,
                'status' => 200,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            // dd($e);
            return response()->json([
                'message' => "Error: {$e->getMessage()}",
                'code' => 400,
            ], 400);
        }
        // return redirect()->back();
    }

    public function saveBlogasDraft(Request $request)
    {
        try {
            DB::beginTransaction();

            Blog::updateOrCreate(
                ['id' => $request->id],
                array_merge(
                    $request->only([
                        'title',
                        'slug',
                        'description',
                        'category',
                        'image'
                    ]),
                    ['published' => 0]
                )
            );
            DB::commit();
            return response()->json([
                'message' => 'success!',
                'status' => 200,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::error($e->getMessage());
            return response()->json([
                'message' => "Error: {$e->getMessage()}",
                'code' => 400,
            ], 400);
        }
    }


    // Deletion
    public function deleteBlog($id)
    {
        try {
            DB::beginTransaction();
            $blog = Blog::find($id);
            $blog->delete();
            DB::commit();
            return response()->json([
                'message' => 'success!',
                'status' => 200,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::error($e->getMessage());
            return response()->json([
                'message' => "Error: {$e->getMessage()}",
                'code' => 400,
            ], 400);
        }
    }

    public function showBlogTrashPage()
    {
        $trash = Blog::onlyTrashed()->paginate(10);
        foreach ($trash as $key => $value) {
            $trash[$key]->preview = strip_tags($value->description);
        }
        return inertia(
            'Admin/Blog/Detail/AdminBlogTrashPage',
            // 'Admin/Blog/Detail/AdminBlogTrashPage',
            [
                'trash' => $trash
            ]
        );
    }

    //restore blog
    public function restoreBlog($id)
    {
        try {
            DB::beginTransaction();
            $blog = Blog::onlyTrashed()->find($id);
            $blog->restore();
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::error($e->getMessage());
            return redirect()->back();
        }
    }

    public function permanentDeleteBlog($id)
    {
        try {
            DB::beginTransaction();
            $blog = Blog::onlyTrashed()->find($id);
            $blog->forceDelete();
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::error($e->getMessage());
            return redirect()->back();
        }
    }
}
