import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardPartsBComponent } from './dash-board-parts-b.component';

describe('DashBoardPartsBComponent', () => {
  let component: DashBoardPartsBComponent;
  let fixture: ComponentFixture<DashBoardPartsBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardPartsBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardPartsBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
