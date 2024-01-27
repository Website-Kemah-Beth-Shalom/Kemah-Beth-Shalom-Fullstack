<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $Images = DB::table('images');
        // $Images->truncate(); //clear all data from table

        // $Images->insert([
        //     'title' => 'Building',
        //     'description' => 'this is building',
        //     'url' => 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        //     'size' => '941419',
        //     'thumbnail' => 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        //     'is_display' => '1',
        // ]);
    }
}
