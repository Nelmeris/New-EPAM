import { User } from '../user/user';
import { Rule } from './rule';

export class UserRule {
    userId: number;
    ruleId: number;

    user: User;
    rule: Rule;

    constructor(json) {
        if (!json) {
            return;
        }
        this.userId = json.user_id;
        this.ruleId = json.rule_id;
    }
}
