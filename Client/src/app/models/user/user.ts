import { UserType } from './user-type';

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
        this.typeId = json.user_type_id;
        this.name = json.name;
        this.surname = json.surname;
        this.email = json.email;
        this.phoneNumber = json.phone_number;
        this.creationDate = json.creation_date;
    }

    public toJSON() {
        return JSON.stringify({
            id: this.id,
            username: this.username,
            password: this.password,
            user_type_id: this.typeId,
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone_number: this.phoneNumber,
            creation_date: this.creationDate
        });
    }

    get fullName(): string {
        return this.name + ' ' + this.surname;
    }
}
