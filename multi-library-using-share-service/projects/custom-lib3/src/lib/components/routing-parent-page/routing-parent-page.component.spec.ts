import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingParentPageComponent } from './routing-parent-page.component';

describe('RoutingParentPageComponent', () => {
  let component: RoutingParentPageComponent;
  let fixture: ComponentFixture<RoutingParentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingParentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
