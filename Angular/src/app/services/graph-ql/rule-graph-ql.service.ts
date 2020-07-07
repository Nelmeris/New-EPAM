import { Injectable } from '@angular/core';
import { Rule } from 'src/app/models/rules/rule';
import { Apollo, gql } from 'apollo-angular-boost';
import { RuleQuery, UserTypeRuleQuery } from 'src/app/types/operation-result-types';
import { threadId } from 'worker_threads';
import { UserTypeRule } from 'src/app/models/rules/user-type-rule';

@Injectable({
  providedIn: 'root'
})
export class RuleGraphQLService {

  private rulesQuery = gql`
    query GetRules {
      rules {
        id, title
      }
    }
  `;

  private userTypeRulesQuery = gql`
    query GetUserTypeRules {
      userTypeRules {
        id, ruleId, userTypeId
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getRules() {
    console.log('[GraphQL]: Getting rules')
    const result = await this.apollo
    .query<RuleQuery>({ 
      query: this.rulesQuery
     }).toPromise();
    return result.data.rules
    .map(element => this.ruleFromData(element))
  }

  async getUserTypeRules() {
    console.log('[GraphQL]: Getting user type rules')
    const result = await this.apollo
    .query<UserTypeRuleQuery>({ 
      query: this.userTypeRulesQuery
     }).toPromise();
    return result.data.userTypeRules
    .map(element => this.userTypeRulesFromData(element))
  }

  private ruleFromData(data: any): Rule {
    const rule = new Rule();
    rule.fill(data);
    return rule
  }

  private userTypeRulesFromData(data: any): UserTypeRule {
    const rule = new UserTypeRule();
    rule.fill(data);
    return rule
  }

}
