import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { last } from 'rxjs/operators';
import { CHECK_STATE_VALUE } from 'src/app/constants/check-state';
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

  describe('ステータス更新処理', () => {

    it('updateで一部CheckedがtrueになるデータがきたらselectedState$がindeterminateを通知すること', fakeAsync(() => {
      const baseData: UserWithCheckedInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0, checked: true },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0, checked: false },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1, checked: false },
      ];
      queryService.update(baseData);
      queryService.selectedState$.subscribe(x => {
        expect(x).toEqual(CHECK_STATE_VALUE.indeterminate);
      });
      flush();
    }));

    it('updateでtrueになるデータがない場合はselectedState$がnothingを通知すること', fakeAsync(() => {
      const baseData: UserWithCheckedInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0, checked: false },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0, checked: false },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1, checked: false },
      ];
      queryService.update(baseData);
      queryService.selectedState$.subscribe(x => {
        expect(x).toEqual(CHECK_STATE_VALUE.nothing);
      });
      flush();
    }));

    it('updateでtrueになるデータしかない場合はselectedState$がallを通知すること', fakeAsync(() => {
      const baseData: UserWithCheckedInterface[] = [
        { userId: 'id1', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName1', userType: 0, checked: true },
        { userId: 'id2', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName2', userType: 0, checked: true },
        { userId: 'id3', registerDate: new Date(2021, 0, 1, 0, 0, 0, 0), userName: 'userName3', userType: 1, checked: true },
      ];
      queryService.update(baseData);
      queryService.selectedState$.subscribe(x => {
        expect(x).toEqual(CHECK_STATE_VALUE.all);
      });
      flush();
    }));
  });
});
