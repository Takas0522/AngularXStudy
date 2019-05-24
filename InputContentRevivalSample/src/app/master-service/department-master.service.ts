import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IDepartmentModel {
    code: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentMasterService {
    private data: BehaviorSubject<IDepartmentModel[]>;

    constructor() {
        const initdata = [
            { code: 1, name: 'A Dep' },
            { code: 2, name: 'B Dep' },
            { code: 3, name: 'C Dep' },
            { code: 4, name: 'D Dep' },
            { code: 5, name: 'E Dep' },
        ];
        this.data = new BehaviorSubject<IDepartmentModel[]>(initdata);
    }

    data$(): Observable<IDepartmentModel[]> {
        return this.data.asObservable();
    }

}
