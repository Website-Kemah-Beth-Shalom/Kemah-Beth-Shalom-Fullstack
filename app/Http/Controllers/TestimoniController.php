<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestimoniModel;
use Illuminate\Support\Facades\Storage;
use Inertiai\inertia;

class TestimoniController extends Controller
{
    public function index()
    {
        $testimonies = TestimoniModel::all();
        return Inertia('Testimonies/index', compact('testimonies'));
    }
    
    public function create()
    {
        return Inertia('Testimonies/create');
    }

    public function store(Request $request, TestimoniModel $testimoni)
    {
        $testimoni = $request->validate([
            'description' => 'required|string|max:110',
            'name'        => 'required|string|max:25',
        ]);

        TestimoniModel::create($testimoni);

        return redirect()->back();
    }

    public function edit(TestimoniModel $testimoni)
    {
        return Inertia('Testimonies/edit', compact('testimonies'));
    }

    public function update(Request $request, TestimoniModel $testimoni, $id)
    {
        $testimoni = TestimoniModel::findorFail($id);

        $data = $request->validate([
            'description' => 'required|string|max:110',
            'name'        => 'required|string|max:25'
        ]);

        $testimoni->update($data);
        $testimoni->save();
        return redirect()->back();

        // return redirect()->route('Testimonies/index')->with('Success', 'Changed Successfully!');
    }

    public function destroy($id)
    {
        $testimoni = TestimoniModel::findorFail($id);

        $testimoni->delete();

        return redirect()->back();
    }
}
