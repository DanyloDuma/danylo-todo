import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from '../models/todo';
import { environmentApi } from '../../environments/environmentApi';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // HttpClient do Angular
  private http = inject(HttpClient);

  // A URL base da API REST
  private readonly apiUrl = `${environmentApi.apiUrl}/todos`;

  // 1. GET /api/todos -> Listar todas as tarefas
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // 2. POST /api/todos -> Criar uma tarefa nova
  createTodo(todoData: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todoData);
  }

  // 3. PUT /api/todos/{id} -> Atualizar uma tarefa (ex: marcar como concluída)
  updateTodo(id: number, todoData: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todoData);
  }

  // 4. DELETE /api/todos/{id} -> Apagar uma tarefa
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
