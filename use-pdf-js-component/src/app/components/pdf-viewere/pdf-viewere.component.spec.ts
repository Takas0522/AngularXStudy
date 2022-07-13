import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewereComponent } from './pdf-viewere.component';

describe('PdfViewereComponent', () => {
  let component: PdfViewereComponent;
  let fixture: ComponentFixture<PdfViewereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfViewereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
