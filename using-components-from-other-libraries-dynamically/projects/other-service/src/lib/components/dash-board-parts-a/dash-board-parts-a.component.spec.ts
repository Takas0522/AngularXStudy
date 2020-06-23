import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardPartsAComponent } from './dash-board-parts-a.component';

describe('DashBoardPartsAComponent', () => {
  let component: DashBoardPartsAComponent;
  let fixture: ComponentFixture<DashBoardPartsAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardPartsAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardPartsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
