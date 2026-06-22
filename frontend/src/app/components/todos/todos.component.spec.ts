import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TodoService } from '../../services/todo.service';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    todoService = jasmine.createSpyObj<TodoService>('TodoService', [
      'getTodos',
      'createTodo',
      'updateTodo',
      'deleteTodo',
    ]);
    todoService.getTodos.and.returnValue(of([]));
    todoService.createTodo.and.returnValue(
      of({
        id: 1,
        user_id: 1,
        title: 'Estudar Angular',
        description: null,
        is_completed: false,
      }),
    );
    todoService.updateTodo.and.returnValue(
      of({
        id: 1,
        user_id: 1,
        title: 'Estudar Reactive Forms',
        description: 'Atualizada',
        is_completed: false,
      }),
    );

    const authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'getCurrentUser',
    ]);
    authService.getCurrentUser.and.returnValue(
      of({ id: 1, name: 'Ana', email: 'ana@example.com' }),
    );
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
      declarations: [TodosComponent],
      providers: [
        { provide: TodoService, useValue: todoService },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load all todos', () => {
    expect(component).toBeTruthy();
    expect(todoService.getTodos).toHaveBeenCalledWith('all');
  });

  it('should create a todo from the form', () => {
    component.todoForm.setValue({
      title: 'Estudar Angular',
      description: '',
    });

    component.submit();

    expect(todoService.createTodo).toHaveBeenCalledWith({
      title: 'Estudar Angular',
      description: null,
    });
  });

  it('should update a todo, reload the list and leave edit mode', () => {
    component.startEdit({
      id: 1,
      user_id: 1,
      title: 'Estudar Angular',
      description: null,
      is_completed: false,
    });
    component.todoForm.setValue({
      title: 'Estudar Reactive Forms',
      description: 'Atualizada',
    });
    todoService.getTodos.calls.reset();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    const submitButton = form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    form.dispatchEvent(new Event('submit'));

    expect(submitButton).toBeTruthy();
    expect(todoService.updateTodo).toHaveBeenCalledWith(1, {
      title: 'Estudar Reactive Forms',
      description: 'Atualizada',
    });
    expect(todoService.getTodos).toHaveBeenCalledWith('all');
    expect(component.editingTodoId).toBeNull();
    expect(component.todoForm.getRawValue()).toEqual({
      title: '',
      description: '',
    });
  });
});
