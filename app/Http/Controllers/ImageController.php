<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomException;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as ImageIntervetion;

class ImageController extends Controller
{

    public function createThumbnail($path)
    {
        $thumbnail = 'thumbnail_' . basename($path); // Ensure only the filename is appended
        $img = ImageIntervetion::make(storage_path('app/' . $path))->resize(100, 100);

        $save_path = storage_path('app' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR);

        if (!file_exists($save_path)) {
            mkdir($save_path, 0775, true); // Changed permissions to 0775
        }

        $img->save($save_path . $thumbnail);
        return $thumbnail;
    }

    public function getAllImage(Request $request)
    {
        if ($request->has('search')) {
            // separate search by space
            $search = explode(' ', $request->search);
            $search = array_map('strtolower', $search);
            // ignore the - sign on data title
            $search = array_map(function ($value) {
                if (substr($value, 0, 1) == '-') {
                    return substr($value, 1);
                }
                return $value;
            }, $search);
            $image = Image::where(function ($query) use ($search) {
                foreach ($search as $value) {
                    $query->orWhere('title', 'like', '%' . $value . '%');
                }
            })->get();
            return response()->json([
                'message' => 'success',
                'data' => $image,
                'status' => 200,
            ], 200);
        }

        $image = Image::orderBy('created_at', 'desc')->get();
        # get every image size
        return response()->json([
            'message' => 'success',
            'data' => $image,
            'status' => 200,
        ], 200);
    }



    public function uploadImage(Request $request)
    {
        try {

            if (!$request->hasFile('image')) {
                return response()->json([
                    'message' => 'image is required',
                ], 400);
            }
            // store image to storage
            $path = $request->file('image')->store('public/images');

            // get image size
            $size = Storage::size($path);

            // create thumbnail
            $thumbnail = $this->createThumbnail($path);
            $thumbnail_with_path = Storage::url('public/images/' . $thumbnail);
            $image = Image::create([
                'title' => imgExtention($request->image),
                'url' => $path,
                'size' => $size,
                'thumbnail' => $thumbnail_with_path,
            ]);

            return response()->json([
                'message' => 'Image uploaded successfully',
                'data' => $image,
                'status' => 200,
            ], 200);
        } catch (CustomException $e) {
            return response()->json([
                'message' => "Error: {$e->getMessage()}",
                'code' => 400,
            ], 400);
        }
    }

    public function deleteImage($id)
    {
        try {
            $image = Image::find($id);
            $image->delete();
            Storage::delete($image->url);
            return response()->json([
                'message' => 'Image deleted successfully',
                'status' => 200,
            ], 200);
        } catch (CustomException $e) {
            return response()->json([
                'message' => "Error: {$e->getMessage()}",
                'code' => 400,
            ], 400);
        }
    }

    public function updateImage(Request $request, $id)
    {
        try {
            $image = Image::find($id);
            // only update requested field
            $image->fill($request->only([
                'title',
                'description',
                'is_display',
            ]));
            $image->save();
            return response()->json([
                'message' => 'Image updated successfully',
                'data' => $image,
                'status' => 200,
            ], 200);
        } catch (CustomException $e) {
            return response()->json([
                'message' => "Error: {$e->getMessage()}",
                'code' => 400,
            ], 400);
        }
    }
}
