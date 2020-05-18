import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPage2Component } from './routing-page2.component';

describe('RoutingPage2Component', () => {
  let component: RoutingPage2Component;
  let fixture: ComponentFixture<RoutingPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
