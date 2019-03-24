import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInputDialogComponent } from './address-input-dialog.component';

describe('AddressInputDialogComponent', () => {
  let component: AddressInputDialogComponent;
  let fixture: ComponentFixture<AddressInputDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInputDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
