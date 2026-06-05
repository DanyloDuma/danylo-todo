import { HttpErrorResponse } from '@angular/common/http';

export interface AppHttpError {
  status: number;
  message: string;
  originalError: HttpErrorResponse;
}
