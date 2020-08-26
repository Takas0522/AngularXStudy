import { TestBed, fakeAsync, tick, discardPeriodicTasks, flushMicrotasks } from '@angular/core/testing';

import { UnitTestService } from './unit-test.service';

describe('UnitTestService', () => {
  let service: UnitTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('count upで値がObservableにながれる', (done: DoneFn) => {
    service.getValue$().subscribe(x => {
      expect(x).toEqual(1);
      done();
    });
    service.countUp();
  });
});
