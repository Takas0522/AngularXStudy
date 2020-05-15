import { TestBed } from '@angular/core/testing';

import { ModelAService } from './model-a.service';

describe('ModelAService', () => {
  let service: ModelAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
