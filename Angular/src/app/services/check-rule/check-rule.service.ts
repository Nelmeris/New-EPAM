import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { UserTypeRuleGraphQLService } from '../graph-ql/user-type-rule-graph-ql.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRuleService {

  constructor(
    private userTypeRuleGraphQLService: UserTypeRuleGraphQLService
  ) { }

  private async checkRule(user: User, ruleId: string): Promise<boolean> {
    if (!user) 
      return false;
    const userTypeRules = await this.userTypeRuleGraphQLService.getCollection();
    const rule = userTypeRules.find(val => val.userTypeId === user.typeId && val.ruleId === ruleId);
    return rule !== undefined;
  }

  async adminPanel(user: User): Promise<boolean> {
    return this.checkRule(user, 'IMQAWA5J9pRlf2PtEJBq');
  }

  async accountPanel(user: User): Promise<boolean> {
    return this.checkRule(user, 'aVchWd7peOUsbpWVcf4k');
  }

  async creatingAdminRole(user: User): Promise<boolean> {
    return this.checkRule(user, 'LodYzkn1i7P0syhrBwaP');
  }

  async changingContent(user: User): Promise<boolean> {
    return this.checkRule(user, 'SxKteSEfrP3AvG1Xs8vK');
  }

  async viewingOrders(user: User): Promise<boolean> {
    if (!user) 
      return false;
    if (user.typeId === '2') {
      return true;
    }
    return this.checkRule(user, 'DvKaPlMY05Rfp9RuAA1M');
  }

  async changingOrderStatuses(user: User): Promise<boolean> {
    return this.checkRule(user, 'kV8bCRAwW4sPAWyW6P4I');
  }

  async sendingNotifications(user: User): Promise<boolean> {
    return this.checkRule(user, 'oLWNj2f2ZRMisXkHCKmB');
  }

  async viewingRules(user: User): Promise<boolean> {
    return this.checkRule(user, 'lUTUE9NgUkZjQXTy3vTK');
  }

  async viewingUsers(user: User): Promise<boolean> {
    return this.checkRule(user, 'gy0iLH06It9UAx9c98bo');
  }

  async changingProjectManager(user: User): Promise<boolean> {
    return this.checkRule(user, 'maOWKrUjbFQKk4fUTmAI');
  }
}
