import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { UserTypeRule } from '../../models/rules/user-type-rule';
import { UserType } from '../../models/user/user-type';
import { Rule } from '../../models/rules/rule';
import { RuleGraphQLService } from 'src/app/services/graph-ql/rule-graph-ql.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {

  userTypeRules: UserTypeRule[] = [];
  userTypes: UserType[] = [];
  rules: Rule[] = [];

  constructor(
    private dataBaseService: DataBaseService,
    private ruleGraphQLService: RuleGraphQLService
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.loadData();
    })();
  }

  private async loadData() {
    this.userTypeRules = await this.ruleGraphQLService.getUserTypeRules();
    this.userTypes = await this.dataBaseService.getUserTypes();
    this.rules = await this.ruleGraphQLService.getRules();
    this.userTypeRules.forEach(userTypeRule => {
      userTypeRule.rule = this.rules.find(rule => rule.id === userTypeRule.ruleId);
      userTypeRule.userType = this.userTypes.find(userType => userType.id === userTypeRule.userTypeId);
    });
  }

  removeRule(rule: UserTypeRule) {
    if (!confirm('Вы уверены?'))
      return;
    this.userTypeRules = this.userTypeRules.filter(item => item !== rule);
    (async () => {
      await this.dataBaseService.deleteUserTypeRuleById(rule.id);
      window.location.reload();
    })();
  }

}
