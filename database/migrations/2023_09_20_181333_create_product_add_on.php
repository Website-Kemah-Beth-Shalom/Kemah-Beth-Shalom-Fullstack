<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_add_ons', function (Blueprint $table) {
            $table->id()->autoIncrement()->unique()->index();
            $table->unsignedBigInteger("product_id"); // foreign key of product id
            $table->string("name");
            $table->integer("price")->nullable(); //per m^2
            $table->string("description")->nullable();
            $table->string("image")->nullable();
            $table->timestamps();

            // soft delete
            $table->softDeletes();

            // foreign key
            // $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_add_on');
    }
};
