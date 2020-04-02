import {UserType} from "./user-type";

export class User {
    id: number;
    username: string;
    password: string;
    typeId: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    creationDate: Date;

    type: UserType;

    constructor(json) {
        if (!json) {
            return;
        }
        this.id = json.id;
        this.username = json.username;
        this.password = json.password;
        this.typeId = json.typeId;
        this.name = json.name;
        this.surname = json.surname;
        this.email = json.email;
        this.phoneNumber = json.phone_number;
        this.creationDate = json.creation_date;
    }

    get fullName(): string {
        return this.name + ' ' + this.surname;
    }
}
