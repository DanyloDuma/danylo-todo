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
        Schema::create('todos', function (Blueprint $table) {
            $table->id();

            // Relações (Chaves Estrangeiras)
            // Se um utilizador for apagado, apaga os seus todos (onDelete cascade)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            // Dados da Tarefa
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('due_date'); // Data e hora limite
            $table->boolean('is_completed')->default(false);

            // Controlo do Alerta (Para o Laravel saber se já avisou 1 dia antes)
            $table->boolean('alert_sent')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
