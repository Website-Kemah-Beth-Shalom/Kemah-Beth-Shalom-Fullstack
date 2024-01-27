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
        Schema::create('productmaterialitems', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('productmaterial_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('price', 10);
            $table->string('image')->nullable();
            $table->timestamps();

            // foreign key
            $table->foreign('productmaterial_id')->references('id')->on('productmaterials')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productmaterialitems');
    }
};
