<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $Video = DB::table('videos');
        $Video->truncate(); //clear all data from table

        $count = 1;
        for ($i = 1; $i <= 9; $i++) {
            $Video->insert([
                'id' =>  $i,
                'title' => 'Kursi',
                'link' => 'https://youtu.be/MvrNw-LkOus?si=xgiqQGnWlzn3iaoL',
            ]);
            $count++;
            if ($count == 9) {
                $count = 1;
            }
        }
    }
}
