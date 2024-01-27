<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GalleryController extends Controller
{

    public function __invoke()
    {
        $images = Image::where('is_display', true)->paginate(10);
        return Inertia::render('Gallery/GalleryPage', [
            'images' => $images
        ]);
    }

    //for  admin
    public function AdminPage()
    {
        // $images = Image::paginate(10);
        $images = Image::where('is_display', true)->paginate(10);
        return Inertia::render('Admin/Gallery/AdminGalleryPage', [
            'images' => $images
        ]);
    }



    public function changeImageStatus(Request $request)
    {
        Validator::validate($request->all(), [
            'id' => 'required',
            'is_display' => 'required'
        ]);
        try {
            $image = Image::find($request->id);
            $image->is_display = $request->is_display;
            $image->save();
            return response()->json([
                'message' => 'success',
                'data' => $image
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'error',
                'data' => $e->getMessage()
            ]);
        }
    }


    public function fetchAllGalleryData()
    {
        $images = GalleryImage::with('image')->get();
        return response()->json($images);
    }

    public function fetchGalleryData($id)
    {
        $image = GalleryImage::with('image')->where('id', $id)->first();
        return response()->json($image);
    }

    public function createGalleryData(Request $request)
    {
        $request->validate([
            'image_id' => 'required',
            'published' => 'required',
            'description' => 'required'
        ]);

        $image = new GalleryImage();
        $image->image_id = $request->image_id;
        $image->published = $request->published;
        $image->description = $request->description;
        $image->save();

        return response()->json([
            'message' => 'success',
            'data' => $image
        ]);
    }

    public function updateGalleryData(Request $request, $id)
    {
        $request->validate([
            'image_id' => 'required',
            'published' => 'required',
            'description' => 'required'
        ]);

        $image = GalleryImage::find($id);
        $image->image_id = $request->image_id;
        $image->published = $request->published;
        $image->description = $request->description;
        $image->save();

        return response()->json([
            'message' => 'success',
            'data' => $image
        ]);
    }

    public function deleteGalleryData($id)
    {
        $image = GalleryImage::find($id);
        $image->delete();

        return response()->json([
            'message' => 'success',
            'data' => $image
        ]);
    }
}
