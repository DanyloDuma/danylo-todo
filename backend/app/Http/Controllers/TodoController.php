<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Listar todas as tarefas (GET /api/todo)
     */
    public function index()
    {
        $todo = Todo::all();
        return response()->json($todo, 200);
    }

    /**
     * Criar uma nova tarefa (POST /api/todo)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $todo = Todo::create($validated);
        return response()->json($todo, 201);
    }

    /**
     * Mostrar uma tarefa específica (GET /api/todo/{id})
     */
    public function show(Todo $todo)
    {
        // O Laravel faz a busca automática no MySQL usando o ID que vem na URL
        return response()->json($todo, 200);
    }

    /**
     * Atualizar uma tarefa (PUT /api/todo/{id})
     */
    public function update(Request $request, Todo $todo)
    {
        // Validamos apenas o que o utilizador pode querer atualizar
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'sometimes|required|date',
            'category_id' => 'sometimes|required|exists:categories,id',
            'is_completed' => 'sometimes|required|boolean',
        ]);

        // Se o prazo for alterado, reiniciamos o controlo do alerta em background
        if (isset($validated['due_date']) && $validated['due_date'] !== $todo->due_date) {
            $validated['alert_sent'] = false;
        }

        $todo->update($validated);
        return response()->json($todo, 200);
    }

    /**
     * Eliminar uma tarefa (DELETE /api//{id})
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        // Retorna uma mensagem de sucesso confirmando a eliminação
        return response()->json(['message' => 'Tarefa eliminada com sucesso.'], 200);
    }
}
