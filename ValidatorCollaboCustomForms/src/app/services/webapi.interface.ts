import { Observable } from "rxjs";

export interface WebApiInterface<T> {

  init(): Promise<void>;

  getDatas(queryParam?:any): Observable<T[]>;

  getData(value: string): Observable<T | null>;

}