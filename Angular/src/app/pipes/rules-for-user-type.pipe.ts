import { Pipe, PipeTransform } from '@angular/core';
import { Rule } from 'src/app/models/rules/rule';
import { UserType } from 'src/app/models/user/user-type';
import { UserTypeRule } from 'src/app/models/rules/user-type-rule';

@Pipe({
  name: 'rulesForUserType'
})
export class RulesForUserTypePipe implements PipeTransform {

  transform(rules: Rule[], userTypeId: string, userTypeRules: UserTypeRule[]): Rule[] {
    const userRules = userTypeRules.filter(rule => {
      return rule.userTypeId === userTypeId;
    })
    return rules.filter(rule => {
      return userRules.findIndex(userRule => userRule.ruleId === rule.id) === -1
    })
  }

}
