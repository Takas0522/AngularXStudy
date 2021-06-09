import { TestBed } from '@angular/core/testing';
import { UserInterface } from 'src/app/models/user.interface';

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

  describe('フィルタ処理', () => {
    it('文字列によるフィルタ', () => {
      const baseData: UserInterface[] = [
        { userId: 'dest', registerDate: new Date(2021,0,1,0,0,0,0),  }
      ];
      queryService.filterUserList({ isAdmin: true, isCommonUser: false, searchInput: 'テスト' });
      queryService.userList$.subscribe(x => {

      });
    });
  });

  describe('fetch処理', () => {});

  describe('service連携', () => {});
});
