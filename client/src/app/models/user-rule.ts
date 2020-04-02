import {User} from "./user";
import {Rule} from "./rule";

export class UserRule {
    userId: number;
    ruleId: number;

    user: User;
    rule: Rule;

    constructor(json) {
        this.userId = json.user_id;
        this.ruleId = json.rule_id;
    }
}
