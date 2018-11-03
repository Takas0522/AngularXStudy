import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialChipsComponent } from './material-chips.component';

describe('MaterialChipsComponent', () => {
  let component: MaterialChipsComponent;
  let fixture: ComponentFixture<MaterialChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
