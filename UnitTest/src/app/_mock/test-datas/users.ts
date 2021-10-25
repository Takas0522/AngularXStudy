import { UserInterface, USER_TYPE_VALUE } from 'src/app/models/user.interface';

export const userDatas: UserInterface[] = [
  { userId: '1', userName: '1ユーザー', userType: USER_TYPE_VALUE.Admin, registerDate: new Date() },
  { userId: '2', userName: '2ユーザー', userType: USER_TYPE_VALUE.commonUser, registerDate: new Date() },
  { userId: '3', userName: '3ユーザー', userType: USER_TYPE_VALUE.commonUser, registerDate: new Date() },
  { userId: '4', userName: '4ユーザー', userType: USER_TYPE_VALUE.commonUser, registerDate: new Date() },
  { userId: '5', userName: '5ユーザー', userType: USER_TYPE_VALUE.commonUser, registerDate: new Date() },
];
