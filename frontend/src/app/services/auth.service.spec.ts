import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environmentApi } from '../../environments/environmentApi';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
    sessionStorage.clear();
  });

  it('should save the token after login', () => {
    service
      .login({ email: 'ana@example.com', password: 'password123' })
      .subscribe();

    const request = httpController.expectOne(`${environmentApi.apiUrl}/login`);
    request.flush({
      user: { id: 1, name: 'Ana', email: 'ana@example.com' },
      token: 'plain-token',
      token_type: 'Bearer',
    });

    expect(service.getToken()).toBe('plain-token');
    expect(service.isAuthenticated()).toBeTrue();
  });
});
