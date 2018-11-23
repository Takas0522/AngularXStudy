import { TestBed } from '@angular/core/testing';

import { QrInputService } from './qr-input.service';

describe('QrInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrInputService = TestBed.get(QrInputService);
    expect(service).toBeTruthy();
  });
});
