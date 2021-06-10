import { Pipe, PipeTransform } from '@angular/core';
import { USER_TYPE_VALUE } from '../models/user.interface';

/*
条件によって描画、記述する内容が変更されるようなものの場合は
Pipeを使用したほうがテストを書きやすいしHTMLテンプレート、Componentの記述量がぐっと減る。
Pipeに書くようなものは基本staticな関数になりがちなので、少し複雑な関数になりそうなら分離しておけば余計にテストは書きやすい
(Pipeの動作のテストをするためにあれこれする必要がなくなる)
*/

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: number): string {
    return genUserTypeName(value);
  }

}

export const genUserTypeName = (value: number): string => {
  if (value === USER_TYPE_VALUE.Admin) {
    return '管理者';
  }
  if (value === USER_TYPE_VALUE.commonUser) {
    return '一般ユーザー';
  }
  return '';
};
