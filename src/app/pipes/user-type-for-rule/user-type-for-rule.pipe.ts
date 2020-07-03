import { Pipe, PipeTransform } from '@angular/core';
import { UserTypeRule } from '../../models/rules/user-type-rule';

@Pipe({
  name: 'userTypeForRule'
})
export class UserTypeForRulePipe implements PipeTransform {

  transform(userTypeRules: UserTypeRule[], ruleId: number): UserTypeRule[] {
    return userTypeRules.filter(rule => rule.ruleId === ruleId);
  }

}
