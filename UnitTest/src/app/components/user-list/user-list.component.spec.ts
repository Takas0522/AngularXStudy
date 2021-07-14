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
import { UserListService } from './user-list.service';
import { MatTableModule } from '@angular/material/table';
import { UserWithCheckedInterface } from './models/user-with-cheked.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CHECK_STATE, CHECK_STATE_VALUE } from 'src/app/constants/check-state';
import { asyncData } from 'src/app/tesiting/asyncData';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let queryStub: UserQueryService;
  let serviceStub: UserListService;
  let routerLocation: Location;
  const stubListSubject = new Subject<UserInterface[]>();
  const stubSelectedSubject = new Subject<CHECK_STATE>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        // Materialなど使用しているModuleはここで解決しておく
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        // SpyオブジェクトでDIをすることでSpyを使用したReturnValueやCallチェックなどを行えるようにする
        // DIでサービスを入れ替える。HTTPとか余計な処理の実行の防止と、サービスのDIチェーンの防止。interfaceが一致していればOK
        {
          provide: UserQueryService,
          useValue: {
            // Observableなテストの簡略化のためGetterで返却するList$はテスト内で生成したBehaviorSubject変数を使用する
            get userList$(): Observable<UserInterface[]> { return stubListSubject.asObservable(); },
            get selectedState$(): Observable<CHECK_STATE> { return stubSelectedSubject.asObservable(); },
          }
        },
        {
          provide: UserListService,
          useValue: {
            fetch(): void { },
            changeChekedState(id: string): void { },
            allCheckStateChange(): void {},
            filterUserList(filterWord: string): void { },
          }
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // DIしたSpyオブジェクトを参照する
    queryStub = fixture.debugElement.injector.get(UserQueryService);
    serviceStub = fixture.debugElement.injector.get(UserListService);
    // AngularのLocaltion取得のため
    routerLocation = fixture.debugElement.injector.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Load', () => {
    it('Load時はListのFetchが叩かれること', () => {
      // filterUserListをSpyしCallされたかなど認識できるようにする
      spyOn(serviceStub, 'fetch');
      component.ngOnInit();
      expect(serviceStub.fetch).toHaveBeenCalled();
    });
    it('Load時の検索項目の初期値は空となっていること', () => {
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
    it('Queryから値の変更が通知された際は、userListに変更が反映されること', () => {
      const resVal: UserWithCheckedInterface[] = [
        { checked: false, userId: '1', userName: 'TS', userType: 0, registerDate: new Date(2021, 1, 1, 0, 0, 0.0) }
      ];
      const testObs = component.userList$.subscribe(x => {
        expect(x).toEqual(resVal);
      });
      stubListSubject.next(resVal);
      testObs.unsubscribe();
    });
    it('selectedState$の変更がallの状態ではcantDelete$にfalseで反映されること', () => {
      const testObs = component.cantDelete$.subscribe(x => {
        expect(x).toBeFalse();
      });
      stubSelectedSubject.next(CHECK_STATE_VALUE.all);
      /*
      同一のObservableな変数を続けてテストしたい場合がある。
      内部で宣言しているstubを使っている影響なのか
      subscribeした状態が残り続けるので適切に後処理を行わないと下記のnextを実行した際に↑のテストが再実行され失敗することになる
      そのため再度同一のテストが実行されないようにunsubscribeを行い同一のテストが実行されないように後処理を行っておく必要がある
      */
      testObs.unsubscribe();
    });
    it('selectedState$の変更がindeterminateの状態ではcantDelete$にfalseで反映されること', () => {
      const testObs = component.cantDelete$.subscribe(x => {
        expect(x).toBeFalse();
      });
      stubSelectedSubject.next(CHECK_STATE_VALUE.indeterminate);
      testObs.unsubscribe();
    });
    it('selectedState$の変更がnothingの状態ではcantDelete$にtrueで反映されること', () => {
      const testObs = component.cantDelete$.subscribe(x => {
        expect(x).toBeTrue();
      });
      stubSelectedSubject.next(CHECK_STATE_VALUE.nothing);
      testObs.unsubscribe();
    });
  });

  describe('検索項目', () => {
    it('検索文字列入力後、QueryのfilterUserListが叩かれること', fakeAsync(() => {
      spyOn(serviceStub, 'filterUserList');
      // setTimeoutやdebouceTimeなどの非同期処理を行う場合はfakeAsyncを使用する
      component.formGroup.patchValue({ searchInput: 'testvalue' });
      fixture.detectChanges();
      /*
      tickは指定時間の経過をシミュレートする。
      doneは非同期処理の完了を通知する。なのでdone時にマクロタスクキューに情報が残っていると完了したけどキューに情報あるよってことでエラーになったりする
        > Error: 1 timer(s) still in the queue.
      たとえば、doneを使う場合👇のような書き方をすると初期＋最後のデータではなく最後の1データしかキューにたまらないのでエラーにならない
      component.userList$.pipe(last()).subscribe(x => { expect(x).toEqual(resVal); done(); })
      stubSubject.next(resVal);
      */
      tick(200);
      // このメソッド呼んだ？ってテスト
      expect(serviceStub.filterUserList).toHaveBeenCalled();
      // このメソッドこの引数で呼んだ？ってテスト
      expect(serviceStub.filterUserList).toHaveBeenCalledWith({
        isAdmin: true,
        isCommonUser: true,
        searchInput: 'testvalue'
      });
    }));
    it('検索文字列入力後、200ms未満であればfilterUserListが叩かれないこと', fakeAsync(() => {
      spyOn(serviceStub, 'filterUserList');
      // setTimeoutやdebouceTimeなどの非同期処理を行う場合はfakeAsyncを使用する
      component.formGroup.patchValue({ searchInput: 'testvalue' });
      fixture.detectChanges();
      // ComponentのdebouceTimeは200ms待機するのでここでも200ms待機
      tick(100);
      // このメソッド呼んだ？ってテスト
      expect(serviceStub.filterUserList).not.toHaveBeenCalled();
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

    it('チェックボックス押下処理でListの状態が更新されるファンクションが呼び出されること', () => {
      spyOn(serviceStub, 'changeChekedState');
      component.changeCheckedState('1');
      expect(serviceStub.changeChekedState).toHaveBeenCalled();
      expect(serviceStub.changeChekedState).toHaveBeenCalledWith('1');
    });

    it('ヘッダチェックボックス押下処理でList全選択ファンクションが呼び出されること', () => {
      spyOn(serviceStub, 'allCheckStateChange');
      component.allCheckStateChange();
      expect(serviceStub.allCheckStateChange).toHaveBeenCalled();
    });
  });
});
