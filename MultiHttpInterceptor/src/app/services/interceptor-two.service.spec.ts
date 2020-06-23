import { TestBed } from '@angular/core/testing';

import { InterceptorTwoService } from './interceptor-two.service';

describe('InterceptorTwoService', () => {
  let service: InterceptorTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
