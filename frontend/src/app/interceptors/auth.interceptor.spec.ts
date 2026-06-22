import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environmentApi } from '../../environments/environmentApi';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: { getToken: () => 'plain-token' },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should add API authentication headers', () => {
    http
      .patch(`${environmentApi.apiUrl}/todos/1`, { title: 'Atualizada' })
      .subscribe();

    const request = httpController.expectOne(`${environmentApi.apiUrl}/todos/1`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.headers.get('Authorization')).toBe(
      'Bearer plain-token',
    );
    expect(request.request.headers.get('Accept')).toBe('application/json');
    request.flush([]);
  });
});
