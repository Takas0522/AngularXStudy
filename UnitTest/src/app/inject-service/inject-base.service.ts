import { Injectable } from '@angular/core';
import { InjectSubService } from './inject-sub.service';

@Injectable()
export class InjectBaseService {

  constructor(
    private injectService: InjectSubService
  ) { }

  calcVal(val1: number, val2: number): number {
    const sum = this.injectService.sum(val1, val2);
    return sum * 1000;
  }
}
