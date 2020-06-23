import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }
  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      console.log('HTTP ERROR');
    } else {
      console.log('OTHER ERROR');
    }
    throw(error);
  }
}
