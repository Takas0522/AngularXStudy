import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, last } from 'rxjs/operators';
import { routes } from 'src/app/app-routing.module';
import { UserInterface } from 'src/app/models/user.interface';

import { UserListComponent } from './user-list.component';
import { UserQueryService } from './user-query.service';
import { Location } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let queryStub: UserQueryService;
  let routerLocation: Location;
  const stubSubject = new Subject<UserInterface[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [
        // Materialなど使用しているModuleはここで解決しておく
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        // SpyオブジェクトでDIをすることでSpyを使用したReturnValueやCallチェックなどを行えるようにする
        // DIでサービスを入れ替える。HTTPとか余計な処理の実行の防止と、サービスのDIチェーンの防止。interfaceが一致していればOK
        {provide: UserQueryService, useValue: {
          // Observableなテストの簡略化のためGetterで返却するList$はテスト内で生成したBehaviorSubject変数を使用する
          get userList$(): Observable<UserInterface[]> { return stubSubject.asObservable(); },
          filterUserList(filterWord: string): void {},
          fetch(): void {}
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    // DIしたSpyオブジェクトを参照する
    fixture.detectChanges();
    queryStub = fixture.debugElement.injector.get(UserQueryService);
    // AngularのLocaltion取得のため
    routerLocation = fixture.debugElement.injector.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Load', () => {
    it ('Load時はListのFetchが叩かれること', () => {
      // filterUserListをSpyしCallされたかなど認識できるようにする
      spyOn(queryStub, 'fetch');
      component.ngOnInit();
      expect(queryStub.fetch).toHaveBeenCalled();
    });
    it ('Load時の検索項目の初期値は空となっていること', () => {
      // componentの初期値などのテスト。FormGroupやFormControlなんか使っていると案外テストしやすい
      // 正味Controlと画面のバインドが適切に行われているか？とかはテストしなくても良いんでないかと思っている
      expect(component.formGroup.value).toEqual({
        searchInput: '',
        isAdmin: true,
        isCommonUser: true
      });
    });
  });

  describe('Query動作', () => {
    it('Queryから値の変更が通知された際は、userListに変更が反映されること', fakeAsync((done: DoneFn) => {
      const resVal: UserInterface[] = [{ userId: '1', userName: 'TS', userType: 0, registerDate: new Date(2021, 1, 1, 0, 0, 0.0) }];
      component.userList$.subscribe(x => {
        expect(x).toEqual(resVal);
        // flushでマクロタスクキューを空にする(subscribeの処理を実行し空にするみたいなイメージ)
        flush();
        /*
        似たような処理でtickとかdoneがある。
        tickは指定時間の経過をシミュレートする。
        doneは非同期処理の完了を通知する。なのでdone時にマクロタスクキューに情報が残っていると完了したけどキューに情報あるよってことでエラーになったりする
          > Error: 1 timer(s) still in the queue.
        たとえば、doneを使う場合👇のような書き方をすると初期＋最後のデータではなく最後の1データしかキューにたまらないのでエラーにならない
        component.userList$.pipe(last()).subscribe(x => { expect(x).toEqual(resVal); done(); })
        stubSubject.next(resVal);
        */
      });
      stubSubject.next(resVal);
    }));
  });

  describe('検索項目', () => {
    it ('検索文字列入力後、QueryのfilterUserListが叩かれること', fakeAsync(() => {
      spyOn(queryStub, 'filterUserList');
      // setTimeoutやdebouceTimeなどの非同期処理を行う場合はfakeAsyncを使用する
      component.formGroup.patchValue({searchInput: 'testvalue'});
      fixture.detectChanges();
      // ComponentのdebouceTimeは200ms待機するのでここでも200ms待機
      tick(200);
      // このメソッド呼んだ？ってテスト
      expect(queryStub.filterUserList).toHaveBeenCalled();
      // このメソッドこの引数で呼んだ？ってテスト
      expect(queryStub.filterUserList).toHaveBeenCalledWith({
        isAdmin: true,
        isCommonUser: true,
        searchInput: 'testvalue'
      });
    }));
    it ('検索文字列入力後、200ms未満であればfilterUserListが叩かれないこと', fakeAsync(() => {
      spyOn(queryStub, 'filterUserList');
      // setTimeoutやdebouceTimeなどの非同期処理を行う場合はfakeAsyncを使用する
      component.formGroup.patchValue({searchInput: 'testvalue'});
      fixture.detectChanges();
      // ComponentのdebouceTimeは200ms待機するのでここでも200ms待機
      tick(100);
      // このメソッド呼んだ？ってテスト
      expect(queryStub.filterUserList).not.toHaveBeenCalled();
      // 残りの100msを実行しタスクを空にする(tick指定時間数分実行しないとタスクに結果がオチてこない→flushしても溜まってないので意味がない)
      tick(100);
    }));
  });

  describe('画面動作処理', () => {

    it('編集ボタンを押下したらパラメータ付きURLで遷移すること', fakeAsync(() => {
      component.editUser('1');
      // AngularのRouter遷移で内部にマクロタスクキューが貯まるので実行してやる
      flush();
      expect(routerLocation.path()).toEqual('/user/1');
    }));

    it('新規ボタンを押下したらパラメータなしURLで遷移すること', fakeAsync(() => {
      component.addNewUser();
      flush();
      expect(routerLocation.path()).toEqual('/user');
    }));
  });
});
