import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AppHttpError } from '../models/app-http-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ocorreu um erro inesperado';

        switch (error.status) {
          case 0:
            message = 'Não foi possível conectar ao servidor';
            break;
          case 401:
            message = 'Não autenticado';
            break;
          case 403:
            message = 'Acesso negado';
            break;
          case 404:
            message = 'Recurso não encontrado';
            break;
          default:
            if (error.status >= 500) {
              message = 'Erro interno do servidor';
            }
        }

        console.error(message, error);

        return throwError(
          () =>
            ({
              status: error.status,
              message,
              originalError: error,
            }) as AppHttpError,
        );
      }),
    );
  }
}
