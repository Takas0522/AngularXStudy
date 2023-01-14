import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonGuardPageComponent } from './non-guard-page.component';

describe('NonGuardPageComponent', () => {
  let component: NonGuardPageComponent;
  let fixture: ComponentFixture<NonGuardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonGuardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonGuardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
