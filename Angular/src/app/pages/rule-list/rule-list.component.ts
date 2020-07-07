import { Component, OnInit } from '@angular/core';
import { UserTypeRule } from '../../models/rules/user-type-rule';
import { UserType } from '../../models/user/user-type';
import { Rule } from '../../models/rules/rule';
import { RuleGraphQLService } from 'src/app/services/graph-ql/rule-graph-ql.service';
import { UserTypeRuleGraphQLService } from 'src/app/services/graph-ql/user-type-rule-graph-ql.service';
import { UserTypeGraphQLService } from 'src/app/services/graph-ql/user-type-graph-ql.service';

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
    private ruleGraphQLService: RuleGraphQLService,
    private userTypeRuleGraphQLService: UserTypeRuleGraphQLService,
    private userTypeGraphQLService: UserTypeGraphQLService
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.loadData();
    })();
  }

  private async loadData() {
    this.userTypeRules = await this.userTypeRuleGraphQLService.getCollection();
    this.userTypes = await this.userTypeGraphQLService.getCollection();
    this.rules = await this.ruleGraphQLService.getCollection();
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
      await this.userTypeRuleGraphQLService.delete(rule.id);
      window.location.reload();
    })();
  }

}
