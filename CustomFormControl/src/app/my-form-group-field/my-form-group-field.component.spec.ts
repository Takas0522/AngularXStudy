import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormGroupFieldComponent } from './my-form-group-field.component';

describe('MyFormGroupFieldComponent', () => {
  let component: MyFormGroupFieldComponent;
  let fixture: ComponentFixture<MyFormGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormGroupFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormGroupFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
