import { UserType } from './user-type';
import { Identifiable } from './../../interfaces/identifiable';

export class User implements Identifiable {
    id: string;
    
    password: string;
    typeId: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;

    type: UserType;

    fill(data: any) {
        this.id = data.id;
        this.password = data.password;
        this.typeId = data.typeId;
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.createdAt = new Date(data.createdAt);
    }

    get fullName(): string {
        return this.name + ' ' + this.surname;
    }

}
