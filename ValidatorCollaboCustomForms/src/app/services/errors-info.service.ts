import { Inject, Injectable, InjectionToken } from '@angular/core';

export interface ErrorsInfo {
  errors: ErrorInfo[];
}

export interface ErrorInfo {
  errorId: string,
  errorMessage: string;
}

export const ERRORS_INFO_TOKEN = new InjectionToken<ErrorsInfo>('errorsinfotoken');

@Injectable({
  providedIn: 'root'
})
export class ErrorsInfoService {

  constructor(
    @Inject(ERRORS_INFO_TOKEN)
    private errors: ErrorsInfo[]
  ) { }

  getErrorMessage(errorId: string): string {
    let message = '未定義のエラーです。';
    console.log(this.errors)
    this.errors.forEach(f => {
      if (f.errors.some(error => error.errorId === errorId)) {
        message = f.errors.filter(error => error.errorId === errorId)[0].errorMessage;
      }
    });
    return message;
  }
}
