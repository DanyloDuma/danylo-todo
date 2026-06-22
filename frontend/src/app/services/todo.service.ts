import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoData, TodoStatus } from '../models/todo';
import { environmentApi } from '../../environments/environmentApi';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environmentApi.apiUrl}/todos`;

  getTodos(status: TodoStatus = 'all'): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl, { params: { status } });
  }

  createTodo(todoData: TodoData): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todoData);
  }

  updateTodo(id: number, todoData: Partial<TodoData>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todoData);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
