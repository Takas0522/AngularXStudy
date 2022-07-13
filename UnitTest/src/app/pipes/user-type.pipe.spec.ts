import { UserTypePipe } from './user-type.pipe';

describe('UserTypePipe', () => {
  const pipe = new UserTypePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it ('0の場合は一般ユーザーとなること', () => {
    const res = pipe.transform(0);
    expect(res).toEqual('一般ユーザー');
  });

  it ('1の場合は管理者となること', () => {
    const res = pipe.transform(1);
    expect(res).toEqual('管理者');
  });
});
