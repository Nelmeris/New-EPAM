import { Injectable } from '@angular/core';
import {User} from '../../models/user/user';
import {DataBaseService} from '../data-base/data-base.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRuleService {

  constructor(private dataBaseService: DataBaseService) { }

  private async checkRule(user: User, ruleId: number): Promise<boolean> {
    const userTypeRules = await this.dataBaseService.getUserTypeRules();
    const rule = userTypeRules.find(val => val.userTypeId === user.typeId && val.ruleId === ruleId);
    return rule !== undefined;
  }

  async adminPanel(user: User): Promise<boolean> {
    return this.checkRule(user, 1);
  }

  async accountPanel(user: User): Promise<boolean> {
    return this.checkRule(user, 2);
  }

  async creatingAdminRole(user: User): Promise<boolean> {
    return this.checkRule(user, 3);
  }

  async changingContent(user: User): Promise<boolean> {
    return this.checkRule(user, 4);
  }

  async viewingOrders(user: User): Promise<boolean> {
    if (user.typeId === 2) {
      return true;
    }
    return this.checkRule(user, 5);
  }

  async changingOrderStatuses(user: User): Promise<boolean> {
    return this.checkRule(user, 6);
  }

  async sendingNotifications(user: User): Promise<boolean> {
    return this.checkRule(user, 7);
  }

  async viewingRules(user: User): Promise<boolean> {
    return this.checkRule(user, 8);
  }

  async viewingUsers(user: User): Promise<boolean> {
    return this.checkRule(user, 9);
  }

  async changingProjectManager(user: User): Promise<boolean> {
    return this.checkRule(user, 10);
  }
}
