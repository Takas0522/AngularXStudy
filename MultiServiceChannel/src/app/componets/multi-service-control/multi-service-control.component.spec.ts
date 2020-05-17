import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiServiceControlComponent } from './multi-service-control.component';

describe('MultiServiceControlComponent', () => {
  let component: MultiServiceControlComponent;
  let fixture: ComponentFixture<MultiServiceControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiServiceControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiServiceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
