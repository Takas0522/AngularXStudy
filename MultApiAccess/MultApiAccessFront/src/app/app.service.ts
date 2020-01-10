import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, concat } from 'rxjs';
import { IDataAccess } from './models/data-access-interface';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private http: HttpClient
    ) {}

    getSingleData(id: string): Observable<IDataAccess> {
        return this.http.get<IDataAccess>(`/weatherforecast/${id}`);
    }

    getMultipleDataWithMerge(): Observable<IDataAccess> {
        const obs1 = this.getSingleData('1');
        const obs2 = this.getSingleData('2');
        const obs3 = this.getSingleData('3');
        return merge(obs1, obs2, obs3);
    }

    getMultipleDataWithMergeArray(): Observable<IDataAccess> {
        const mergeObs: Observable<IDataAccess>[] = [];
        Array.from(new Array(10)).map((d, m) => {
            mergeObs.push(this.getSingleData(m.toString()));
        });
        return merge(...mergeObs);
    }

    getMultipleDataWithConcat(): Observable<IDataAccess> {
        const obs1 = this.getSingleData('1');
        const obs2 = this.getSingleData('2');
        const obs3 = this.getSingleData('3');
        return concat(obs1, obs2, obs3);
    }

    getMultipleDataWithConcatArray(): Observable<IDataAccess> {
        const concatObs: Observable<IDataAccess>[] = [];
        Array.from(new Array(10)).map((d, m) => {
            concatObs.push(this.getSingleData(m.toString()));
        });

        return concat(...concatObs);
    }
}
