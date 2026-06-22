import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environmentApi } from '../../environments/environmentApi';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should request todos with the selected filter', () => {
    service.getTodos('pending').subscribe();

    const request = httpController.expectOne(
      `${environmentApi.apiUrl}/todos?status=pending`,
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('should update a todo with PATCH', () => {
    service
      .updateTodo(1, { title: 'Título atualizado', description: null })
      .subscribe();

    const request = httpController.expectOne(`${environmentApi.apiUrl}/todos/1`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({
      title: 'Título atualizado',
      description: null,
    });
    request.flush({});
  });
});
