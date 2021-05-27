import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputControlComponent } from './multi-input-control.component';

describe('MultiInputControlComponent', () => {
  let component: MultiInputControlComponent;
  let fixture: ComponentFixture<MultiInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiInputControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
