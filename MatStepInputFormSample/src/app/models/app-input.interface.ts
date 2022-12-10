export const initData: AppInputInterface = {
  personalInfo: {
    userName: '',
    userAddress: '',
    userPhoneNumber:''
  },
  deliveryInfo: {
    zipCode: '',
    address: '',
    address2: ''
  }
}

export interface AppInputInterface {
  personalInfo: PersonalInfoInterface;
  deliveryInfo: DeliveryInfoInterface;
}

export interface PersonalInfoInterface {
  userName: string;
  userAddress: string;
  userPhoneNumber: string;
}

export interface DeliveryInfoInterface {
  zipCode: string;
  address: string;
  address2: string;
}