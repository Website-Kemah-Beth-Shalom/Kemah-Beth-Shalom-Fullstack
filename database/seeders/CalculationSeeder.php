<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CalculationSeeder extends Seeder
{

    public function run(): void
    {
        // Product product_id
        $products = DB::table('products');
        $products->truncate();
        DB::table('products')->truncate();
        $Data_products = [
            [
                'id' => 1, // 1 = 'Lemari
                'name' => 'Lemari',
                'price' => 1000000, // 1 = 'Lemari
                'description' => 'Ini adalah lemari',
                'image' => 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            [
                'id' => 2, // 1 = 'Kusen Pintu
                'name' => 'Kusen Pintu',
                'price' => 1000000, // 1 = 'Lemari
                'description' => 'Ini adalah kusen pintu',
                'image' => 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

            ],
            [
                'id' => 3, // 1 = 'Kitchen Set
                'name' => 'Kitchen Set',
                'price' => 1000000, // 1 = 'Lemari
                'description' => 'Ini adalah kitchen set',
                'image' => 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            
            ],
        ];
        $products->insert($Data_products);



        //product materials
        $product_materials = DB::table('productmaterials');

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('productmaterials')->truncate();
        // $product_materials->truncate();
        $data_product_materials = [
            [
                'id' => 1,
                'product_id' => 1, // 1 = 'Lemari
                'name' => 'Bahan A',
                'description' => 'Ini adalah bahan A',
            ],
            [
                'id' => 2,
                'product_id' => 1, // 1 = 'Lemari
                'name' => 'Bahan B',
                'description' => 'Ini adalah bahan B',
            ]
        ];
        $product_materials->insert($data_product_materials);

        //product material items
        $product_material_items = DB::table('productmaterialitems');
        // $product_material_items->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('productmaterialitems')->truncate();

        $data_product_material_items = [
            [
                'id' => 1,
                'productmaterial_id' => 1,
                'name' => 'Bahan A1',
                'description' => 'Ini adalah bahan A1',
                'price' => 1000000,
            ],
            [
                'id' => 2,
                'productmaterial_id' => 1,
                'name' => 'Bahan A2',
                'description' => 'Ini adalah bahan A2',
                'price' => 1000000,
            ],
            [
                'id' => 3,
                'productmaterial_id' => 2,
                'name' => 'Bahan B1',
                'description' => 'Ini adalah bahan B1',
                'price' => 1000000,
            ],
            [
                'id' => 4,
                'productmaterial_id' => 2,
                'name' => 'Bahan B2',
                'description' => 'Ini adalah bahan B2',
                'price' => 1000000,
            ],
        ];

        $product_material_items->insert($data_product_material_items);

        // Product add ons
        $product_add_ons = DB::table('product_add_ons');
        $product_add_ons->truncate();
        $data_product_add_ons = [
            // product_id Lemari
            [
                'product_id' => 1,
                'name' => 'Wacom Cintiq 16',
                'price' => 1000000,
                'description' => 'Ini adalah Wacom Cintiq 16',
            ],
            [
                'product_id' => 1,
                'name' => 'LG',
                'price' => 1000000,
                'description' => 'Lorem Bla bla bla',
            ],
            [
                'product_id' => 1,
                'name' => 'Sejahtra',
                'price' => 1000000,
                'description' => 'Lorem Bla bla bla',
            ],
            [
                'product_id' => 1,
                'name' => 'Sanyo',
                'price' => 1000000,
                'description' => 'Lorem Bla bla bla',
            ],
            // product_id Kusen Pintu
            [
                'product_id' => 2,
                'name' => 'Atlas',
                'price' => 1000000,
                'description' => 'Lorem Bla bla bla',
            ],
            [
                'product_id' => 2,
                'name' => 'Sanyo',
                'price' => 1000000,
                'description' => 'Lorem Bla bla bla',
            ],
            // product_id Kitchen set
            [
                'product_id' => 3,
                'name' => 'Ciangmai',
                'price' => 20000,
                'description' => 'Ini adalah kusen pintu',
            ],
            [
                'product_id' => 3,
                'name' => 'Lapindo',
                'price' => 30000,
                'description' => 'Ini adalah kusen pintu Lapindo',
            ],
        ];
        $product_add_ons->insert($data_product_add_ons);
    }
}
