import { TestBed } from '@angular/core/testing';

import { InterceptorOneService } from './interceptor-one.service';

describe('InterceptorOneService', () => {
  let service: InterceptorOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
