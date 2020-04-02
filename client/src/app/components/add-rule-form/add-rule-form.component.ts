import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Rule} from "../../models/rule";
import {UserType} from "../../models/user-type";
import {DataBaseService} from "../../services/data-base.service";
import {UserTypeRule} from "../../models/user-type-rule";

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

  constructor(private dataBaseService: DataBaseService) { }

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
  }

  createRole() {
    (async () => {
      if (this.createRoleForm.invalid) {
        alert('Не все данные введены');
        return;
      }
      const title = this.createRoleForm.value.roleTitle;
      const userTypes = await this.dataBaseService.getUserTypes();
      if (userTypes.find(userType => userType.title === title)) {
        alert('Данная роль уже существует');
      } else {
        const type = new UserType(null);
        type.id = userTypes[userTypes.length - 1].id + 1;
        type.title = title;
        await this.dataBaseService.createUserType(type);
        alert('Роль ' + title + ' успешно создана');
        window.location.reload();
      }
    })();
  }

  createRule() {
    (async () => {
      if (this.createRuleForm.invalid) {
        alert('Не все данные введены');
        return;
      }
      const title = this.createRuleForm.value.ruleTitle;
      const rules = await this.dataBaseService.getRules();
      if (rules.find(rule => rule.title === title)) {
        alert('Данное правило уже существует');
      } else {
        const rule = new Rule(null);
        rule.id = rules[rules.length - 1].id + 1;
        rule.title = title;
        await this.dataBaseService.createRule(rule);
        alert('Правило "' + title + '" успешно создано');
        window.location.reload();
      }
    })();
  }

  createRuleForUserType() {
    (async () => {
      const roleId = this.createRuleForUserForm.value.roleId;
      const ruleId = this.createRuleForUserForm.value.ruleId;
      if (!roleId || !ruleId) {
        alert('Не все пункты выбраны');
        return;
      }
      const rules = await this.dataBaseService.getUserTypeRules();
      if (rules.find(rule => rule.userTypeId === roleId && rule.ruleId === ruleId)) {
        alert('Данное правило уже задано');
      } else {
        const rule = new UserTypeRule(null);
        rule.id = rules[rules.length - 1].id + 1;
        rule.ruleId = ruleId;
        rule.userTypeId = roleId;
        await this.dataBaseService.createUserTypeRule(rule);
        alert('Правило успешно задано');
        window.location.reload();
      }
    })();
  }

}
