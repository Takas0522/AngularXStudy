import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankPagaeComponent } from './blank-pagae.component';

describe('BlankPagaeComponent', () => {
  let component: BlankPagaeComponent;
  let fixture: ComponentFixture<BlankPagaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankPagaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankPagaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
