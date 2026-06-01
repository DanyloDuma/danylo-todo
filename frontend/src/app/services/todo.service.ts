import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // HttpClient do Angular
  private http = inject(HttpClient);

  // A URL base da API REST
  private apiUrl = 'http://localhost:8000/api/todos';

  // 1. GET /api/todos -> Listar todas as tarefas
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2. POST /api/todos -> Criar uma tarefa nova
  createTodo(todoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todoData);
  }

  // 3. PUT /api/todos/{id} -> Atualizar uma tarefa (ex: marcar como concluída)
  updateTodo(id: number, todoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, todoData);
  }

  // 4. DELETE /api/todos/{id} -> Apagar uma tarefa
  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
