import { USER_TYPE } from '../../../models/user.interface';

export interface UserWithCheckedInterface {
  checked: boolean;
  userId: string;
  userName: string;
  registerDate: Date;
  userType: USER_TYPE;
}
