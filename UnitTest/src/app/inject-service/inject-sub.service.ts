import { Injectable } from '@angular/core';
import { InjectSubSubService } from './inject-sub-sub.service';

@Injectable()
export class InjectSubService {

  constructor(
    private injectSubSubService: InjectSubSubService
  ) { }

  sum(val1: number, val2: number ): number {
    return val1 + val2;
  }
}
