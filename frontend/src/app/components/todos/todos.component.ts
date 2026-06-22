import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AppHttpError } from '../../models/app-http-error';
import { User } from '../../models/auth';
import { Todo, TodoData, TodoStatus } from '../../models/todo';
import { AuthService } from '../../services/auth.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly todoService = inject(TodoService);
  private readonly authService = inject(AuthService);

  readonly todoForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
  });

  readonly filters: { value: TodoStatus; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'completed', label: 'Concluídas' },
  ];

  user: User | null = null;
  todos: Todo[] = [];
  selectedFilter: TodoStatus = 'all';
  editingTodoId: number | null = null;
  errorMessage = '';
  isLoading = false;
  isSaving = false;

  ngOnInit(): void {
    this.loadUser();
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.todoService
      .getTodos(this.selectedFilter)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (todos) => {
          this.todos = todos;
        },
        error: (error: AppHttpError) => {
          this.errorMessage = error.message;
        },
      });
  }

  selectFilter(filter: TodoStatus): void {
    if (filter === this.selectedFilter) {
      return;
    }

    this.selectedFilter = filter;
    this.loadTodos();
  }

  submit(): void {
    if (this.todoForm.invalid || this.isSaving) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const formValue = this.todoForm.getRawValue();
    const data: TodoData = {
      title: formValue.title.trim(),
      description: formValue.description.trim() || null,
    };

    if (!data.title) {
      this.todoForm.controls.title.setErrors({ required: true });
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    const editingTodoId = this.editingTodoId;
    const request = editingTodoId !== null
      ? this.todoService.updateTodo(editingTodoId, data)
      : this.todoService.createTodo(data);

    request.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadTodos();
      },
      error: (error: AppHttpError) => {
        this.errorMessage = error.message;
      },
    });
  }

  startEdit(todo: Todo): void {
    this.editingTodoId = todo.id;
    this.todoForm.setValue({
      title: todo.title,
      description: todo.description ?? '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingTodoId = null;
    this.todoForm.reset({ title: '', description: '' });
  }

  toggleTodo(todo: Todo): void {
    this.todoService
      .updateTodo(todo.id, { is_completed: !todo.is_completed })
      .subscribe({
        next: () => this.loadTodos(),
        error: (error: AppHttpError) => {
          this.errorMessage = error.message;
        },
      });
  }

  deleteTodo(todo: Todo): void {
    if (!window.confirm(`Apagar a tarefa "${todo.title}"?`)) {
      return;
    }

    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        if (this.editingTodoId === todo.id) {
          this.cancelEdit();
        }
        this.loadTodos();
      },
      error: (error: AppHttpError) => {
        this.errorMessage = error.message;
      },
    });
  }

  trackTodo(_index: number, todo: Todo): number {
    return todo.id;
  }

  private loadUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error: AppHttpError) => {
        this.errorMessage = error.message;
      },
    });
  }
}
