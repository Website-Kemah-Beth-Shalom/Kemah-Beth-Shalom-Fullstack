<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebconfigSeeder extends Seeder
{

    public function run(): void
    {
        $webconfig = DB::table('webconfigs');
        $webconfig->truncate(); //clear all data from table

        $data = [
            [
                'title' => 'company_name',
                'alias' => 'Nama Perusahaan',
                'type' => 'text',
                'value' => 'Kemah Beth Shalom',
            ],
            [
                'title' => 'company_description',
                'alias' => 'Deskripsi Perusahaan',
                'type' => 'text',
                'value' => 'Selamat datang di Kemah Beth Shalom adalah panti asuhan & panti werda',
            ],
            [
                'title' => 'company_address',
                'alias' => 'Alamat Perusahaan',
                'type' => 'text',
                'value' => 'Jl. Raya Ciputat Parung No. 1, Ciputat, Tangerang Selatan, Banten',
            ],
            [
                'title' => 'company_call_number',
                'alias' => 'Nomor Telepon Perusahaan',
                'type' => 'text',
                'value' => '(021) 740 6044',
            ]
        ];

        $webconfig->insert($data); //insert batch data to database table (webconfigs)
        // php artisan migrate:fresh --seed --seeder=WebconfigSeeder
    }
}
