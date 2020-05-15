import { TestBed } from '@angular/core/testing';

import { MultiServiceControlService } from './multi-service-control.service';

describe('MultiServiceControlService', () => {
  let service: MultiServiceControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiServiceControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
