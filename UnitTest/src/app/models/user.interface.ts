export const USER_TYPE_VALUE = {
  commonUser: 0,
  Admin: 1
} as const;

export type USER_TYPE = typeof USER_TYPE_VALUE[keyof typeof USER_TYPE_VALUE];

export interface UserInterface {
  userId: string;
  userName: string;
  registerDate: Date;
  userType: USER_TYPE;
}
