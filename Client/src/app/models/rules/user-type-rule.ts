import { UserType } from '../user/user-type';
import { Rule } from './rule';
import { Identifiable } from 'src/app/interfaces/identifiable';

export class UserTypeRule implements Identifiable {
    id: string;

    userTypeId: string;
    ruleId: string;

    userType: UserType;
    rule: Rule;
}
