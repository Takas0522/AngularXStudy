import { Observable } from 'rxjs';

export interface IModelBaseClass {
    get(): Observable<any>;
    post(param: any);
}

export abstract class ModelBaseClass<T> implements IModelBaseClass {
    abstract get(): Observable<T>;
    abstract post(param: T): void;
}
