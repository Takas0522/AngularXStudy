import { TestBed } from '@angular/core/testing';

import { EditingGuardService } from './editing-guard.service';

describe('EditingGuardService', () => {
  let service: EditingGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditingGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
