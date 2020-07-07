import { Injectable } from '@angular/core';
import { Rule } from 'src/app/models/rules/rule';
import { Apollo, gql } from 'apollo-angular-boost';
import { GetRuleCollection, AddRule, AddRuleVariables } from 'src/app/types/operation-result-types';

@Injectable({
  providedIn: 'root'
})
export class RuleGraphQLService {

  private getCollectionQuery = gql`
    query GetRules {
      rules {
        id, title
      }
    }
  `;

  private addMutation = gql`
    mutation AddRule($title:String!) {
      addRule(title: $title) {
        id, title
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getCollection() {
    console.log('[GraphQL]: Getting rules')
    const result = await this.apollo
    .query<GetRuleCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.rules
    .map(element => this.itemFromData(element))
  }

  async add(title: string) {
    console.log('[GraphQL]: Adding rule with title \'' + title + '\'')
    
    const result = await this.apollo.mutate<AddRule, AddRuleVariables>({
      mutation: this.addMutation,
      variables: { title }
    }).toPromise();
    return (result.data.addRule) ?
      this.itemFromData(result.data.addRule) :
      null;
  }

  private itemFromData(data: any): Rule {
    const item = new Rule();
    item.fill(data);
    return item
  }

}
