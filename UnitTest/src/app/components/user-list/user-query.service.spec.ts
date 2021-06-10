import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { last } from 'rxjs/operators';
import { UserInterface } from 'src/app/models/user.interface';
import { UserWithCheckedInterface } from './models/user-with-cheked.interface';
import { UserQueryService } from './user-query.service';

describe('UserQueryService', () => {
  let queryService: UserQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    queryService = TestBed.inject(UserQueryService);
  });

  it('should be created', () => {
    expect(queryService).toBeTruthy();
  });

  describe('update処理', () => {
    it('update実行で引数で指定されたデータからCheckedがFlaseになった状態でObservableに配信される', fakeAsync((done: DoneFn) => {
      const baseData: UserInterface[] = [
        { userId: '1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: '2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: '3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
      ];
      const exp = baseData.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      queryService.update(baseData);
      queryService.userList$.subscribe(x => {
        expect(x).toEqual(exp);
      });
      /*
      データの変更タスクが↑のupdateで貯まるのでflushで全部流す
      */
      flush();
    }));
  });

  describe('フィルタ処理', () => {
    it('文字列によるフィルタ(ユーザー名)', fakeAsync(() => {
      const baseData: UserInterface[] = [
        { userId: '1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: '2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: '3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
      ];
      queryService.update(baseData);
      flush();
      // 一旦ベースデータをアップデートしてflushする
      queryService.filterUserList({ searchInput: 'userName1', isAdmin: true, isCommonUser: true });
      queryService.userList$.subscribe(x => {
        expect(x.length).toEqual(1);
        expect(x.some(s => s.userName === 'userName1')).toBeTrue();
      });
      flush();
    }));

    it('文字列によるフィルタ(ユーザーId)', fakeAsync(() => {
      const baseData: UserInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 0 },
      ];
      queryService.update(baseData);
      flush();
      // 一旦ベースデータをアップデートしてflushする
      queryService.filterUserList({ searchInput: 'id1', isAdmin: true, isCommonUser: true });
      queryService.userList$.subscribe(x => {
        expect(x.length).toEqual(1);
        expect(x.some(s => s.userName === 'userName1')).toBeTrue();
      });
      flush();
    }));

    it('管理者チェックボックスのみOnで管理者のみ抽出されること', fakeAsync(() => {
      const baseData: UserInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1 },
      ];
      queryService.update(baseData);
      flush();
      // 一旦ベースデータをアップデートしてflushする
      queryService.filterUserList({ searchInput: '', isAdmin: true, isCommonUser: false });
      queryService.userList$.subscribe(x => {
        expect(x.length).toEqual(1);
        expect(x.some(s => s.userName === 'userName3')).toBeTrue();
      });
      flush();
    }));

    it('検索文字列が空の場合は全件抽出されること', () => {});
    it('一派ユーザーのみチェックボックスOnで一般ユーザーのみ抽出されること', () => {});
  });

  describe('ステータス更新処理', () => {
    it('changeChekedStateで指定されたIDのCheckedステータスが更新されること', fakeAsync(() => {
      const baseData: UserInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1 },
      ];
      queryService.update(baseData);
      flush();
      queryService.changeChekedState('id1');
      queryService.userList$.subscribe(x => {
        const id1data = x.find(f => f.userId === 'id1');
        expect(id1data.checked).toBeTrue();
      });
      flush();
    }));

    it('changeChekedStateでtrueになるデータが発生したらsomeSelected$がtrueを通知すること', fakeAsync(() => {
      const baseData: UserInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1 },
      ];
      queryService.update(baseData);
      flush();
      queryService.changeChekedState('id1');
      queryService.someSelected$.subscribe(x => {
        expect(x).toBeTrue();
      });
      flush();
    }));

    it('changeChekedStateでtrueになるデータがなくなったらsomeSelected$がfalseを通知すること', fakeAsync(() => {
      const baseData: UserInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0 },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0 },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1 },
      ];
      queryService.update(baseData);
      flush();
      queryService.changeChekedState('id1');
      queryService.changeChekedState('id1');
      queryService.someSelected$.subscribe(x => {
        expect(x).toBeFalse();
      });
      flush();
    }));
  });
});
