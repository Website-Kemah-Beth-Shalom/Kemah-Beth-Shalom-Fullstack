<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id()->autoIncrement()->unique()->index();
            $table->string("name");
            $table->string("description");
            $table->string("image")->nullable();
            $table->integer("price")->nullable();
            $table->integer("is_display")->default(1)->notes('0: not display, 1: display');
            // priority: 0: normal, 1: priority
            $table->integer("priority")->default(0)->notes('0: normal, 1: priority');
            $table->timestamps();
            // soft delete
            $table->softDeletes();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
