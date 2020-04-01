import {UserType} from './user-type.model';

export class User {
    id: number;
    username: string;
    password: string;
    userType: UserType;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    creationDate: Date;
}
