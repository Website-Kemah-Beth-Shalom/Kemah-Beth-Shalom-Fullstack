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
        Schema::create('customerbookmaterials', function (Blueprint $table) {
            // $table->id(); change to uuid
            $table->uuid('id')->primary()->unique()->index();
            $table->string('name');
            $table->unsignedBigInteger('customerbook_id'); // foreign key to customerbook
            $table->unsignedBigInteger('productmaterialitem_id')->nullable();
            $table->text('note')->nullable();
            $table->decimal('width', 10)->nullable();
            $table->decimal('height', 10)->nullable();
            $table->decimal('length', 10)->nullable();
            $table->decimal('total', 10)->nullable();
            $table->timestamps();

            // foreign key
            $table->foreign('customerbook_id')->references('id')->on('customerbooks')->onDelete('cascade');
            $table->foreign('productmaterialitem_id')->references('id')->on('productmaterialitems')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customerbookmaterials');
    }
};
