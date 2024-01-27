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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable()->default("This is image description");
            $table->string('url');
            $table->string('size')->nullable();
            $table->string('thumbnail')->nullable();
            $table->integer('is_display')->default(0)->notes('0: not display, 1: display');
            $table->timestamps();
        });
        

        // soft delete
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
