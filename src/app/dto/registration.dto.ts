export class Owner {

    private _id: number;
    private _serialnumber: number;
    private _brand: string;
    private _model: string;
    private _idnumber: string;
    private _firstname: string;
    private _lastname: string;
    private _contactnumber: number;
    private _email: string;

    constructor (
        id: number,
        serialNumber: number,
        brandName: string,
        model: string,
        ownerIdCardNumber: string,
        ownerFirstName: string,
        ownerLastName: string,
        ownerContactNumber: number,
        ownerEmailAddress: string
    ) {
        this._id = id;
        this._serialnumber = serialNumber;
        this._brand = brandName;
        this._model = model;
        this._idnumber = ownerIdCardNumber;
        this._firstname = ownerFirstName;
        this._lastname = ownerLastName;
        this._contactnumber = ownerContactNumber;
        this._email = ownerEmailAddress;
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get serialNumber(): number {
        return this._serialnumber;
    }

    public set serialNumber(serialNumber: number) {
        this._serialnumber = serialNumber;
    }

    public get brandName(): string {
        return this._brand;
    }

    public set brandName(brandName: string) {
        this._brand = brandName;
    }

    public get model(): string {
        return this._model;
    }

    public set model(model: string) {
        this._model = model;
    }

    public get ownerIdCardNumber(): string {
        return this._idnumber;
    }

    public set ownerIdCardNumber(ownerIdCardNumber: string) {
        this._idnumber = ownerIdCardNumber;
    }

    public get ownerFirstName(): string {
        return this._firstname;
    }

    public set ownerFirstName(ownerFirstName: string) {
        this._firstname = ownerFirstName;
    }

    public get ownerLastName(): string {
        return this._lastname;
    }

    public set ownerLastName(ownerLastName: string) {
        this._lastname = ownerLastName;
    }

    public get ownerContactNumber(): number {
        return this._contactnumber;
    }

    public set ownerContactNumber(ownerContactNumber: number) {
        this._contactnumber = ownerContactNumber;
    }

    public get ownerEmailAddress(): string {
        return this._email;
    }

    public set ownerEmailAddress(ownerEmailAddress: string) {
        this._email = ownerEmailAddress;
    }
}