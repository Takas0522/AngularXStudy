import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleControlComponent } from './sample-control.component';

describe('SampleControlComponent', () => {
  let component: SampleControlComponent;
  let fixture: ComponentFixture<SampleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
