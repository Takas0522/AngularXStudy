import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPage3Component } from './routing-page3.component';

describe('RoutingPage3Component', () => {
  let component: RoutingPage3Component;
  let fixture: ComponentFixture<RoutingPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
