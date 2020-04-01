export class UserTypeRule {
    userTypeId: number;
    ruleId: number;

    constructor(json) {
        this.userTypeId = json.user_type_id;
        this.ruleId = json.rule_id;
    }
}
