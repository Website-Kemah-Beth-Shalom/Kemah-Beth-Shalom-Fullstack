<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Video;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::paginate(10);
        return inertia('Video/VideoPage', [
            'videos' => $videos,
        ]);
    }

    // admin
    public function AdminPage()
    {
        $videos = Video::all();
        return inertia('Admin/Video/AdminVideoPage', [
            'videos' => $videos,
        ]);
    }

    // create new video
    public function create()
    {
        return inertia('Admin/Video/CreateVideoPage');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'link' => 'required',
        ]);

        Video::create($request->all());

        return redirect()->route('admin.video');
    }

    // edit video
    public function edit($id)
    {
        $video = Video::find($id);
        return inertia('Admin/Video/EditVideoPage', [
            'video' => $video,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'link' => 'required',
        ]);

        $video = Video::find($id);
        $video->update($request->all());

        return redirect()->route('admin.video');
    }

    // delete video
    public function destroy($id)
    {
        Video::destroy($id);
        return redirect()->route('admin.video');
    }

    // adminIndex
    public function adminIndex()
    {
        $videos = Video::orderBy('created_at', 'desc')->get();
        return inertia('Admin/Video/AdminVideoPage', [
            'videos' => $videos,
        ]);
    }

    // showAddVideoPage
    public function showAddVideoPage()
    {
        return inertia('Admin/Video/CreateVideoPage');
    }

    // addVideo
    public function addVideo(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'link' => 'required',
        ]);

        Video::create($request->all());

        return redirect()->route('admin.video');
    }
}
