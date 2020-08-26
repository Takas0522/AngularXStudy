import { TestBed } from '@angular/core/testing';

import { InjectBaseService } from './inject-base.service';
import { InjectSubService } from './inject-sub.service';

fdescribe('InjectBaseService', () => {
  let service: InjectBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InjectBaseService,
        { provide: InjectSubService, useValue: {
          sum(val1: number, val2: number): number { return 0; }
        }}
      ]
    });
    service = TestBed.inject(InjectBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('返却値が1000掛けされる', () => {
    const serviceSpy = jasmine.createSpyObj('InjectSubService', [ 'sum' ]) as jasmine.SpyObj<InjectSubService>;
    serviceSpy.sum.and.returnValue(1);
    const ret = service.calcVal(10, 10);
    expect(ret).toEqual(1000);
  });
});
