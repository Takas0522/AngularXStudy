import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserListService } from './user-list.service';
import { HttpClient } from '@angular/common/http';
import { UserQueryService } from './user-query.service';
import { UserInterface } from 'src/app/models/user.interface';

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
            update(datas: UserInterface[]): void { },
            changeChekedState(id: string): void {},
            allCheckStateChange(): void {}
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
    it('fetch処理でapi/usersにHTTPのGETリクエストが実行され、QueryのUpdateが呼び出されること', fakeAsync(() => {
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
      expect(queryStub.update).toHaveBeenCalledWith(baseData);
      httpControler.verify();
    }));
  });
  describe('ステータス更新処理', () => {
    it('changeChekedStateからQueryのchangeChekedStateが実行されること', () => {
      spyOn(queryStub, 'changeChekedState');
      service.changeChekedState('1');
      expect(queryStub.changeChekedState).toHaveBeenCalled();
      expect(queryStub.changeChekedState).toHaveBeenCalledWith('1');
    });

    it ('allCheckStateChangeからQueryのallCheckStateChangeが実行されること', () => {
      spyOn(queryStub, 'allCheckStateChange');
      service.allCheckStateChange();
      expect(queryStub.allCheckStateChange).toHaveBeenCalled();
    });
  });
});
