import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
      'register',
    ]);
    authService.isAuthenticated.and.returnValue(false);
    authService.register.and.returnValue(
      of({
        user: { id: 1, name: 'Ana', email: 'ana@example.com' },
        token: 'token',
        token_type: 'Bearer',
      }),
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
      declarations: [RegisterComponent],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject different passwords', () => {
    component.registerForm.patchValue({
      password: 'password123',
      password_confirmation: 'different-password',
    });

    expect(component.registerForm.hasError('passwordsMismatch')).toBeTrue();
  });
});
