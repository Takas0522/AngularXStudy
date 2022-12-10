import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AppInputInterface } from '../models/app-input.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getData(): Observable<AppInputInterface> {
    return this.httpClient.get<AppInputInterface>('/api/data');
  }

  async postData(data: AppInputInterface): Promise<void> {
    await from(this.httpClient.post('/api/data', data));
  }
}
