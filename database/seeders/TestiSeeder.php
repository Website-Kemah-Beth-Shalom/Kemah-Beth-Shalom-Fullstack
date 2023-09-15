<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestiSeeder extends Seeder
{

    public function run(): void
    {
        $webconfig = DB::table('testimoni_models');
        $webconfig->truncate(); //clear all data from table

        $data = [
            // General 
            [
                
                'name' => 'Jeni',
                'description' => 'pantinya sangat nyaman juga asri',
            ],
            [
                
                'name' => 'Lisda',
                'description' => 'pantinya sangat menarik untuk dikunjungi',
            ],
            [
                
                'name' => 'Deva',
                'description' => 'pantinya rapih, bersih dan juga banyak kegiatan menarik',
            ],
            [
                
                'name' => 'Ivan',
                'description' => 'pantinya ada rusanya dan bagus.',
            ],
            [
                
                'name' => 'Vera',
                'description' => 'pantinya bagus dan bersih. sangat terawat',
            ],
            

        ];

        $webconfig->insert($data); //insert batch data to database table (webconfigs)
        // php artisan migrate:fresh --seed --seeder=WebconfigSeeder
    }
}