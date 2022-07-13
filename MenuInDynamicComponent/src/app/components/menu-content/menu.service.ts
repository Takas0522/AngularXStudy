import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
  clickMenu(num: number) {
      alert(num);
  }
}