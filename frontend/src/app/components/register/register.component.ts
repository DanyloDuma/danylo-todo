import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AppHttpError } from '../../models/app-http-error';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly registerForm = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
    },
    { validators: RegisterComponent.passwordsMatch },
  );

  errorMessage = '';
  isSubmitting = false;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/todos']);
    }
  }

  submit(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    this.authService
      .register(this.registerForm.getRawValue())
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => void this.router.navigate(['/todos']),
        error: (error: AppHttpError) => {
          this.errorMessage = error.message;
        },
      });
  }

  private static passwordsMatch(
    control: AbstractControl,
  ): ValidationErrors | null {
    return control.get('password')?.value ===
      control.get('password_confirmation')?.value
      ? null
      : { passwordsMismatch: true };
  }
}
