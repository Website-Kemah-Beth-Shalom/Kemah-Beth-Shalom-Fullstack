<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Webconfig;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class WebconfigController extends Controller
{
    // Admin function
    public function __invoke(Request $request)
    {
        $webconfigs = Webconfig::all();

        $generalData = $webconfigs->where('category', 'general');

        $general['image'] = Arr::flatten($generalData->where('type', 'image'));
        $general['text'] = Arr::flatten($generalData->where('type', 'text'));
        $general['textarea'] = Arr::flatten($generalData->where('type', 'textarea'));

        $homeData = $webconfigs->where('category', 'home');
        $home['image'] = Arr::flatten($homeData->where('type', 'image'));
        $home['text'] = Arr::flatten($homeData->where('type', 'text'));
        $home['textarea'] = Arr::flatten($homeData->where('type', 'textarea'));


        $costData = $webconfigs->where('category', 'cost');
        $cost['image'] = Arr::flatten($costData->where('type', 'image'));
        $cost['text'] = Arr::flatten($costData->where('type', 'text'));
        $cost['textarea'] = Arr::flatten($costData->where('type', 'textarea'));

        $blogData = $webconfigs->where('category', 'blog');
        $blog['image'] = Arr::flatten($blogData->where('type', 'image'));
        $blog['text'] = Arr::flatten($blogData->where('type', 'text'));
        $blog['textarea'] = Arr::flatten($blogData->where('type', 'textarea'));

        $contactData = $webconfigs->where('category', 'contact');
        $contact['image'] = Arr::flatten($contactData->where('type', 'image'));
        $contact['text'] = Arr::flatten($contactData->where('type', 'text'));
        $contact['textarea'] = Arr::flatten($contactData->where('type', 'textarea'));



        return Inertia(
            'Admin/Webconfig/AdminWebconfigPage',
            [
                'home' => $home,
                'general' => $general,
                'cost' => $cost,
                'blog' => $blog,
                'contact' => $contact,
            ]
        );
    }


    public function UpdateWebconfig(Request $request, Webconfig $webconfig)
    {
        Cache::forget('webconfig');
        $Curr_webconfig = $webconfig->where('title', $request->title)->first();
        if ($Curr_webconfig->type == 'image') {
            # get file name (parse string) "value" is a string of file path
            $filename = Str::afterLast($Curr_webconfig->value, '/');
            $thumbnail = 'thumbnail_' . $filename;

            $Curr_webconfig->thumbnail = Storage::url('images/' . $thumbnail);
        }

        $Curr_webconfig->value = $request->value;

        $Curr_webconfig->save();
        return redirect()->back();
    }
}
