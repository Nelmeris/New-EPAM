import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../../services/data-base.service";
import {UserTypeRule} from "../../models/user-type-rule";
import {UserType} from "../../models/user-type";
import {Rule} from "../../models/rule";

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {

  userTypeRules: UserTypeRule[] = [];
  userTypes: UserType[] = [];
  rules: Rule[] = [];

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
    (async () => {
      this.userTypeRules = await this.dataBaseService.getUserTypeRules();
      this.userTypes = await this.dataBaseService.getUserTypes();
      this.rules = await this.dataBaseService.getRules();
      this.userTypeRules.forEach(userTypeRule => {
        userTypeRule.rule = this.rules.find(rule => rule.id === userTypeRule.ruleId);
        userTypeRule.userType = this.userTypes.find(userType => userType.id === userTypeRule.userTypeId);
      });
    })();
  }

}
