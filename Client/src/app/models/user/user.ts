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

    get fullName(): string {
        console.log(this.name + ' ' + this.surname);
        return this.name + ' ' + this.surname;
    }

}
