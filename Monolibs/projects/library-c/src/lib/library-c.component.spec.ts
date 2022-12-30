import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCComponent } from './library-c.component';

describe('LibraryCComponent', () => {
  let component: LibraryCComponent;
  let fixture: ComponentFixture<LibraryCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
