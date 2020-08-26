import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTestComponent } from './unit-test.component';
import { UnitTestService } from './unit-test.service';

describe('UnitTestComponent', () => {
  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;
  let service: UnitTestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTestComponent ],
      providers: [UnitTestService]
    })
    .compileComponents();
    service = TestBed.inject(UnitTestService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('処理呼び出し', () => {
    spyOn(service, 'countUp');
    component.countUp();
    expect(service.countUp).toHaveBeenCalled();
  });
});
