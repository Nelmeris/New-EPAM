import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rule } from '../../models/rules/rule';
import { UserType } from '../../models/user/user-type';
import { UserTypeRule } from '../../models/rules/user-type-rule';
import { RuleGraphQLService } from 'src/app/services/graph-ql/rule-graph-ql.service';
import { UserTypeRuleGraphQLService } from 'src/app/services/graph-ql/user-type-rule-graph-ql.service';
import { UserTypeGraphQLService } from 'src/app/services/graph-ql/user-type-graph-ql.service';

@Component({
  selector: 'app-add-rule-form',
  templateUrl: './add-rule-form.component.html',
  styleUrls: ['./add-rule-form.component.scss']
})
export class AddRuleFormComponent implements OnInit {

  createRoleForm: FormGroup;
  createRuleForm: FormGroup;
  createRuleForUserForm: FormGroup;

  @Input() rules: Rule[] = [];
  @Input() userTypes: UserType[] = [];

  selectedUserTypeId: string;
  selectedRuleId: string;
  userTypeRules: UserTypeRule[] = [];

  constructor(
    private ruleGraphQLService: RuleGraphQLService,
    private userTypeRuleGraphQLService: UserTypeRuleGraphQLService,
    private userTypeGraphQLService: UserTypeGraphQLService
  ) { }

  ngOnInit(): void {
    this.createRoleForm = new FormGroup({
      roleTitle: new FormControl(null, [Validators.required]),
    });

    this.createRuleForm = new FormGroup({
      ruleTitle: new FormControl(null, [Validators.required]),
    });

    this.createRuleForUserForm = new FormGroup({
      roleId: new FormControl(null, [Validators.required]),
      ruleId: new FormControl(null, [Validators.required])
    });

    (async() => {
      await this.loadData();
    })();
  }

  private async loadData() {
    this.rules = await this.ruleGraphQLService.getCollection();
    this.userTypeRules = await this.userTypeRuleGraphQLService.getCollection();
  }

  createRole() {
    if (this.createRoleForm.invalid) {
      alert('Не все данные введены');
      return;
    }
    const title = this.createRoleForm.value.roleTitle;
    (async () => {
      const userTypes = await this.userTypeGraphQLService.getCollection();
      if (userTypes.find(userType => userType.title === title)) {
        alert('Данная роль уже существует');
      } else {
        await this.userTypeGraphQLService.add(title);
        alert('Роль ' + title + ' успешно создана');
        window.location.reload();
      }
    })();
  }

  createRule() {
    if (this.createRuleForm.invalid) {
      alert('Не все данные введены');
      return;
    }
    const title = this.createRuleForm.value.ruleTitle;
    (async () => {
      if (this.rules.find(rule => rule.title === title)) {
        alert('Данное правило уже существует');
      } else {
        await this.ruleGraphQLService.add(title);
        alert('Правило "' + title + '" успешно создано');
        window.location.reload();
      }
    })();
  }

  createRuleForUserType() {
    const roleId = this.createRuleForUserForm.value.roleId;
    const ruleId = this.createRuleForUserForm.value.ruleId;
    if (!roleId || !ruleId) {
      alert('Не все пункты выбраны');
      return;
    }
    (async () => {
      await this.loadData();
      if (this.userTypeRules.find(rule => rule.userTypeId === roleId && rule.ruleId === ruleId)) {
        alert('Данное правило уже задано');
      } else {
        await this.userTypeRuleGraphQLService.add(ruleId, roleId);
        alert('Правило успешно задано');
        window.location.reload();
      }
    })();
  }

  onChangeUserType() {
    this.selectedRuleId = null;
  }
  
}
