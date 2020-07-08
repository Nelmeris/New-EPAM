import { UserType } from '../user/user-type';
import { Rule } from './rule';

export class UserTypeRule {
    id: string;

    userTypeId: string;
    ruleId: string;

    userType: UserType;
    rule: Rule;

    fill(data: any) {
        if (!data) return;
        this.id = data.id;
        this.userTypeId = data.userTypeId;
        this.ruleId = data.ruleId;
    }
}
