import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, firstValueFrom, Observable, of, tap } from "rxjs";
import { SupplierModel } from "../models/supplier.model";
import { WebApiInterface } from "./webapi.interface";

@Injectable({
  providedIn: 'root'
})
export class SupplierService implements WebApiInterface<SupplierModel> {

  // private http = inject(HttpClient);

  private chacheDatas: SupplierModel[] = [];

  async init(): Promise<void> {
    if (this.chacheDatas.length === 0) {
      await firstValueFrom(this.getDatas());
    }
  }

  getDatas(queryParam?:any): Observable<SupplierModel[]> {
    // 本当はHttpClient使ってどうこうだけど擬似的に。
    return of<SupplierModel[]>([
      { supplierCode: '1', supplierName: 'hoge', supplierAddress: 'xxx-xxxx hogehoge' },
      { supplierCode: '2', supplierName: 'fuga', supplierAddress: 'xxx-xxxx fugafuga' },
      { supplierCode: '3', supplierName: 'piyo', supplierAddress: 'xxx-xxxx piyopiyo' },
    ])
    .pipe(
      delay(5000),
      tap(x => {
        this.chacheDatas = x;
      })
    );
  }

  getData(value: string): Observable<SupplierModel | null> {
    const someData = this.chacheDatas.some(f => f.supplierCode === value);
    console.log(someData)
    if (someData) {
      return of(this.chacheDatas.filter(f => f.supplierCode === value)[0]).pipe(delay(2000));
    }
    return of(null);
  }

}