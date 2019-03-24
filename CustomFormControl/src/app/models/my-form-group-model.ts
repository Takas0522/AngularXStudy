export class MyFormGroupModel {
    public userId: string;
    public familyName: string;
    public lastName: string;
    public address: AddressModel;
}

export class AddressModel {
    public zipCode: string;
    public prefecture: string;
    public city: string;
}
