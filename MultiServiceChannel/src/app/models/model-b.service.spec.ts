import { TestBed } from '@angular/core/testing';

import { ModelBService } from './model-b.service';

describe('ModelBService', () => {
  let service: ModelBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
