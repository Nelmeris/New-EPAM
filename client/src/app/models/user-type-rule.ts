import {UserType} from "./user-type";
import {Rule} from "./rule";

export class UserTypeRule {
    userTypeId: number;
    ruleId: number;

    userType: UserType;
    rule: Rule;

    constructor(json) {
        this.userTypeId = json.user_type_id;
        this.ruleId = json.rule_id;
    }
}
