import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBComponent } from './library-b.component';

describe('LibraryBComponent', () => {
  let component: LibraryBComponent;
  let fixture: ComponentFixture<LibraryBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
