<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', 'in:all,pending,completed'],
        ]);

        $status = $validated['status'] ?? 'all';
        $query = $request->user()->todos()->latest();

        if ($status === 'pending') {
            $query->where('is_completed', false);
        }

        if ($status === 'completed') {
            $query->where('is_completed', true);
        }

        return response()->json($query->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_completed' => ['sometimes', 'boolean'],
        ]);

        $todo = $request->user()->todos()->create($validated);

        return response()->json($todo, 201);
    }

    public function show(Request $request, int $todo): JsonResponse
    {
        return response()->json($this->findUserTodo($request, $todo));
    }

    public function update(Request $request, int $todo): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'is_completed' => ['sometimes', 'boolean'],
        ]);

        $todo = $this->findUserTodo($request, $todo);

        $todo->update($validated);

        return response()->json($todo);
    }

    public function destroy(Request $request, int $todo): Response
    {
        $todo = $this->findUserTodo($request, $todo);
        $todo->delete();

        return response()->noContent();
    }

    private function findUserTodo(Request $request, int $todoId): Todo
    {
        return $request->user()->todos()->findOrFail($todoId);
    }
}
