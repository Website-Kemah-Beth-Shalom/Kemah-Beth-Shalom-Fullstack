<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CallAllSeeder extends Seeder
{

    public function run(): void
    {
        $this->call([
            WebconfigSeeder::class,
            // ProductSeeder::class,
            // UserSeeder::class,
            // PostSeeder::class,
            // CommentSeeder::class,
        ]);
    }
}