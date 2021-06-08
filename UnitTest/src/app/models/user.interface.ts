const USER_TYPE = {
  commonUser: 0,
  Admin: 1
} as const;

type USER_TYPE = typeof USER_TYPE[keyof typeof USER_TYPE];

export interface UserInterface {
  userId: string;
  userName: string;
  registerDate: Date;
  userType: USER_TYPE;
}
