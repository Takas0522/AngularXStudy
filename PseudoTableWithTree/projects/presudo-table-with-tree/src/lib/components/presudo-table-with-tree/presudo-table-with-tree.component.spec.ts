import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresudoTableWithTreeComponent } from './presudo-table-with-tree.component';

describe('PresudoTableWithTreeComponent', () => {
  let component: PresudoTableWithTreeComponent;
  let fixture: ComponentFixture<PresudoTableWithTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresudoTableWithTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresudoTableWithTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
