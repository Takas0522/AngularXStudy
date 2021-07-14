import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { UserTypePipe } from 'src/app/pipes/user-type.pipe';

import { UserEditComponent } from './user-edit.component';
import { UserEditService } from './user-edit.service';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let activatedRouteStub: ActivatedRoute;
  let userEditServiceStub: UserEditService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserEditComponent,
        UserTypePipe
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get(val: string): string { return ''; }
            }
          }
        }},
        { provide: UserEditService, useValue: {
          fetch(): void {}
        }},
      ]
    })
    .compileComponents();
    activatedRouteStub = TestBed.inject(ActivatedRoute);
    userEditServiceStub = TestBed.inject(UserEditService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ルーティング', () => {
    it ('/userで遷移したときはデータ取得処理が実行されないこと', () => {
      spyOn(userEditServiceStub, 'fetch');
      spyOn(activatedRouteStub.snapshot.paramMap, 'get').and.returnValue('');
      component.ngOnInit();
      expect(userEditServiceStub.fetch).not.toHaveBeenCalled();
    });
    it ('/user/1で遷移したときはデータ取得処理が実行されること', () => {
      spyOn(userEditServiceStub, 'fetch');
      spyOn(activatedRouteStub.snapshot.paramMap, 'get').and.returnValue('1');
      component.ngOnInit();
      expect(userEditServiceStub.fetch).toHaveBeenCalledWith('1');
    });
  });

  describe('初期値', () => {
    it ('データ取得処理が実行されない場合は初期値が設定されていること', () => {});
    it ('初期状態ではValidationがINVALIDになっていないこと', () => {});
  });

  describe('Query', () => {
    it ('データ取得処理でQueryにデータが反映されたときはFormGroupに値が反映されること', () => {});
  });

  describe('Validation', () => {
    it ('ユーザーIDが空の場合は必須エラーとなること', () => {});
    it ('ユーザーIDが空でない場合は必須エラーとならないこと', () => {});
    it ('ユーザー名が空の場合は必須エラーとなること', () => {});
    it ('ユーザー名が空でない場合は必須エラーとならないこと', () => {});
  });

  describe('登録処理', () => {
    it ('登録時INVALIDの状態の場合、登録処理が実行されないこと', () => {});
    it ('登録時INVALIDの状態でない場合、登録処理が実行されること', () => {});
  });
});
