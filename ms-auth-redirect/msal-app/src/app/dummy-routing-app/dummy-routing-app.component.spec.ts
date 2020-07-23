import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyRoutingAppComponent } from './dummy-routing-app.component';

describe('DummyRoutingAppComponent', () => {
  let component: DummyRoutingAppComponent;
  let fixture: ComponentFixture<DummyRoutingAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyRoutingAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyRoutingAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
