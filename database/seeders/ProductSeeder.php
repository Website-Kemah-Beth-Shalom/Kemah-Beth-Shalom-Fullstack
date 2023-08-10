<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Products = DB::table('products');
        $Products->truncate(); //clear all data from table

        $data = [
            [
                'title' => 'Kursi',
                'slug' => 'kursi',
                'description' => 'Kursi adalah sebuah benda yang biasanya terbuat dari kayu atau plastik yang digunakan untuk duduk.',
                'image' => 'kursi.jpg',
                'price' => 100000,
            ],
            [
                'title' => 'Meja',
                'slug' => 'meja',
                'description' => 'Meja adalah sebuah benda yang biasanya terbuat dari kayu atau plastik yang digunakan untuk menaruh barang.',
                'image' => 'meja.jpg',
                'price' => 200000,
            ]
        ];

        $Products->insert($data); //insert batch data to database table (products)
    }
}