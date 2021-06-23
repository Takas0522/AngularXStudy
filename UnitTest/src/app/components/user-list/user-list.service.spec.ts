import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserListService } from './user-list.service';
import { HttpClient } from '@angular/common/http';
import { UserQueryService } from './user-query.service';
import { UserInterface, USER_TYPE_VALUE } from 'src/app/models/user.interface';
import { UserWithCheckedInterface } from './models/user-with-cheked.interface';

describe('UserListService', () => {
  let service: UserListService;
  let httpClient: HttpClient;
  let httpControler: HttpTestingController;
  let queryStub: UserQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: UserQueryService,
          useValue: {
            update(datas: UserInterface[]): void { }
          }
        }
      ]
    });
    service = TestBed.inject(UserListService);
    httpClient = TestBed.inject(HttpClient);
    httpControler = TestBed.inject(HttpTestingController);
    queryStub = TestBed.inject(UserQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    it('fetch処理でapi/usersにHTTPのGETリクエストが実行され、CheckedがFalseの状態でQueryのUpdateが呼び出されること', fakeAsync(() => {
      // fetch処理の実行
      service.fetch();
      // serviceから呼ばれるQueryのメソッドをSpyする
      spyOn(queryStub, 'update');
      // api/usersリクエストが行われたか
      const req = httpControler.expectOne('api/users');
      // HTTP MethodはGETだったか
      expect(req.request.method).toEqual('GET');
      const baseData: UserInterface[] = [
        { userId: '1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: '2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: '3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
      ];
      // 返却値として↑の値を返却する
      req.flush(baseData);
      // Query.updateの処理が実行されたか
      expect(queryStub.update).toHaveBeenCalled();
      // Query.updateの処理が↑でflushされた引数で実行されたか
      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expect(queryStub.update).toHaveBeenCalledWith(expData);
      httpControler.verify();
    }));
  });

  describe('ステータス更新処理', () => {

    const baseData: UserInterface[] = [
      { userId: '1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
      { userId: '2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
      { userId: '3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
    ];

    const init = () => {
      service.fetch();
      spyOn(queryStub, 'update');
      const req = httpControler.expectOne('api/users');
      // 返却値として↑の値を返却する
      req.flush(baseData);
    };

    it('指定されたIDのチェックが更新された状態でQueryのUpdate処理が実行されること', () => {
      init();
      service.changeChekedState('1');
      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expData.find(f => f.userId === '1').checked = true;
      expect(queryStub.update).toHaveBeenCalled();
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it ('すべてのデータのチェックがtrueの状態でQueryのUpdate処理が実行されること', () => {
      init();
      service.allCheckStateChange();
      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: true,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expect(queryStub.update).toHaveBeenCalled();
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });
  });

  describe('フィルタ処理', () => {

    const baseData: UserInterface[] = [
      { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
      { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
      { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
    ];

    const init = () => {
      service.fetch();
      spyOn(queryStub, 'update');
      const req = httpControler.expectOne('api/users');
      req.flush(baseData);
    };

    it('文字列によるフィルタ(ユーザー名)が行われた状態でUpdate処理が実行されること', () => {
      init();
      service.filterUserList({ searchInput: 'userName1', isAdmin: true, isCommonUser: true });
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      }).filter(x => x.userName === 'userName1');
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it('文字列によるフィルタ(ユーザーId)が行われた状態でUpdate処理が実行されること', () => {
      init();
      service.filterUserList({ searchInput: 'id1', isAdmin: true, isCommonUser: true });
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      }).filter(x => x.userId === 'id1');
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it('管理者チェックボックスのみOnで管理者のみ抽出されUpdate処理が実行されること', fakeAsync(() => {
      init();
      service.filterUserList({ searchInput: '', isAdmin: true, isCommonUser: false });
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: true,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      }).filter(x => x.userType === USER_TYPE_VALUE.Admin);
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    }));

    it('検索文字列が空の場合は全件抽出されること', () => {});
    it('一派ユーザーのみチェックボックスOnで一般ユーザーのみ抽出されること', () => {});
  });
  describe('チェックステータス更新処理', () => {

    const baseData: UserInterface[] = [
      { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
      { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
      { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
    ];

    const init = () => {
      service.fetch();
      spyOn(queryStub, 'update');
      const req = httpControler.expectOne('api/users');
      req.flush(baseData);
    };

    it('changeChekedStateで指定されたIdのデータのチェックが反転した状態でUpdateが実行されること(F->T)', () => {
      init();
      service.changeChekedState('id2');
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expData.find(x => x.userId === 'id2').checked = !expData.find(x => x.userId === 'id1').checked;
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it('changeChekedStateで指定されたIdのデータのチェックが反転した状態でUpdateが実行されること(T->F)', () => {
      init();
      service.changeChekedState('id1');
      service.changeChekedState('id1');
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it('すべてのデータでチェックが入っていない場合allCheckStateChangeですべてのチェックがはいった状態でUpdateが実行されること', () => {
      init();
      service.changeChekedState('id1');
      service.allCheckStateChange();
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: true,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it('一部のデータでチェックが入っている場合allCheckStateChangeですべてのチェックがはいった状態でUpdateが実行されること', () => {
      init();
      service.allCheckStateChange();
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: true,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

    it('すべてのデータでチェックが入っている場合allCheckStateChangeですべてのチェックが外れた状態でUpdateが実行されること', () => {
      init();
      service.changeChekedState('id1');
      service.changeChekedState('id2');
      service.changeChekedState('id3');
      service.allCheckStateChange();
      expect(queryStub.update).toHaveBeenCalled();

      const expData = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      expect(queryStub.update).toHaveBeenCalledWith(expData);
    });

  });
});
