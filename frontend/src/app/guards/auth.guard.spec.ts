import { TestBed } from '@angular/core/testing';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: authService }],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow authenticated users', () => {
    authService.isAuthenticated.and.returnValue(true);

    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect unauthenticated users to login', () => {
    authService.isAuthenticated.and.returnValue(false);
    const result = guard.canActivate() as UrlTree;

    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login');
  });
});
