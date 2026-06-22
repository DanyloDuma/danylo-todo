<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TodoTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_todos(): void
    {
        $this->getJson('/api/todos')->assertUnauthorized();
    }

    public function test_user_only_lists_their_own_todos_and_can_filter_by_status(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $user->todos()->create(['title' => 'Pendente']);
        $user->todos()->create(['title' => 'Concluída', 'is_completed' => true]);
        $otherUser->todos()->create(['title' => 'Tarefa de outro utilizador']);

        Sanctum::actingAs($user);

        $this->getJson('/api/todos')
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonMissing(['title' => 'Tarefa de outro utilizador']);

        $this->getJson('/api/todos?status=pending')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.title', 'Pendente');

        $this->getJson('/api/todos?status=completed')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.title', 'Concluída');

        $this->getJson('/api/todos?status=invalid')
            ->assertUnprocessable()
            ->assertJsonValidationErrors('status');
    }

    public function test_user_can_create_show_update_and_delete_a_todo(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        Sanctum::actingAs($user);

        $createResponse = $this->postJson('/api/todos', [
            'title' => 'Estudar Laravel',
            'description' => 'Rever relações Eloquent',
            'user_id' => $otherUser->id,
        ]);

        $createResponse
            ->assertCreated()
            ->assertJsonPath('user_id', $user->id)
            ->assertJsonPath('is_completed', false);

        $todoId = $createResponse->json('id');

        $this->getJson("/api/todos/{$todoId}")
            ->assertOk()
            ->assertJsonPath('title', 'Estudar Laravel');

        $this->patchJson("/api/todos/{$todoId}", [
            'title' => 'Estudar Sanctum',
            'is_completed' => true,
        ])
            ->assertOk()
            ->assertJsonPath('title', 'Estudar Sanctum')
            ->assertJsonPath('is_completed', true);

        $this->deleteJson("/api/todos/{$todoId}")->assertNoContent();
        $this->assertDatabaseMissing('todos', ['id' => $todoId]);
    }

    public function test_user_cannot_access_another_users_todo(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $todo = $otherUser->todos()->create(['title' => 'Tarefa privada']);

        Sanctum::actingAs($user);

        $this->getJson("/api/todos/{$todo->id}")->assertNotFound();
        $this->patchJson("/api/todos/{$todo->id}", ['title' => 'Alterada'])->assertNotFound();
        $this->deleteJson("/api/todos/{$todo->id}")->assertNotFound();

        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'title' => 'Tarefa privada',
        ]);
    }

    public function test_title_is_required_when_creating_a_todo(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/todos', ['description' => 'Sem título'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('title');
    }
}
