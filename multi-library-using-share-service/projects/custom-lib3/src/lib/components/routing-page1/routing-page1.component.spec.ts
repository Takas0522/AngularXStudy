import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPage1Component } from './routing-page1.component';

describe('RoutingPage1Component', () => {
  let component: RoutingPage1Component;
  let fixture: ComponentFixture<RoutingPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
