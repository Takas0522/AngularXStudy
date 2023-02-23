import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstControlComponent } from './my-first-control.component';

describe('MyFirstControlComponent', () => {
  let component: MyFirstControlComponent;
  let fixture: ComponentFixture<MyFirstControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFirstControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyFirstControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
