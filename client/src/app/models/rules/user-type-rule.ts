import { UserType } from '../user/user-type';
import { Rule } from './rule';

export class UserTypeRule {
    id: number;
    userTypeId: number;
    ruleId: number;

    userType: UserType;
    rule: Rule;

    constructor(json) {
        if (!json) {
            return;
        }
        this.id = json.id;
        this.userTypeId = json.user_type_id;
        this.ruleId = json.rule_id;
    }

    public toJSON(): string {
        return JSON.stringify({
            id: this.id,
            user_type_id: this.userTypeId,
            rule_id: this.ruleId
        });
    }
}
