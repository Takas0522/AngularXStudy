import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent ]
    })
    .compileComponents();
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
    it ('/userで遷移したときはデータ取得処理が実行されないこと', () => {});
    it ('/user/1で遷移したときはデータ取得処理が実行されること', () => {});
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
