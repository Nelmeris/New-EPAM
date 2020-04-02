import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {DataBaseService} from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRuleService {

  constructor(private dataBaseService: DataBaseService) { }

  async adminPanel(user: User): Promise<boolean> {
    const userTypeRules = await this.dataBaseService.getUserTypeRules();
    const rule = userTypeRules.find(val => val.userTypeId === user.typeId && val.ruleId === 1);
    return rule !== undefined;
  }

  async accountPanel(user: User): Promise<boolean> {
    const userTypeRules = await this.dataBaseService.getUserTypeRules();
    const rule = userTypeRules.find(val => val.userTypeId === user.typeId && val.ruleId === 2);
    return rule !== undefined;
  }
}
