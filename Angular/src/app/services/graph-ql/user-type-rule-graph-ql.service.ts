import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { 
  GetUserTypeRuleCollection, 
  AddUserTypeRule, 
  AddUserTypeRuleVariables, 
  DeleteUserTypeRule, 
  DeleteUserTypeRuleVariables 
} from 'src/app/types/operation-result-types';
import { UserTypeRule } from 'src/app/models/rules/user-type-rule';

@Injectable({
  providedIn: 'root'
})
export class UserTypeRuleGraphQLService {

  private getCollectionQuery = gql`
    query GetUserTypeRules {
      userTypeRules {
        id, ruleId, userTypeId
      }
    }
  `;

  private addMutation = gql`
    mutation AddUserTypeRule($ruleId:String!, $userTypeId:String!) {
      addUserTypeRule(ruleId: $ruleId, userTypeId: $userTypeId) {
        id, ruleId, userTypeId
      }
    }
  `;

  private deleteMutation = gql`
    mutation DeleteUserTypeRule($id:ID!) {
      deleteUserTypeRule(id: $id) {
        id, ruleId, userTypeId
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getCollection() {
    console.log('[GraphQL]: Getting user type rules')
    const result = await this.apollo
    .query<GetUserTypeRuleCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.userTypeRules
    .map(element => this.itemFromData(element))
  }

  async add(ruleId: string, userTypeId: string) {
    console.log('[GraphQL]: Adding user type rule')
    const result = await this.apollo.mutate<AddUserTypeRule, AddUserTypeRuleVariables>({
      mutation: this.addMutation,
      variables: {
        ruleId, userTypeId
      }
    }).toPromise();
    const data = (await result).data;
    return (data.addUserTypeRule) ?
      this.itemFromData(data.addUserTypeRule) :
      null;
  }

  async delete(id: string) {
    console.log('[GraphQL]: Deleting user type rule with ID: ' + id)
    const result = await this.apollo.mutate<DeleteUserTypeRule, DeleteUserTypeRuleVariables>({
      mutation: this.deleteMutation,
      variables: {
        id
      }
    }).toPromise();
    return (result.data.deleteUserTypeRule) ?
      this.itemFromData(result.data.deleteUserTypeRule) :
      null;
  }

  private itemFromData(data: any): UserTypeRule {
    const item = new UserTypeRule();
    item.fill(data);
    return item
  }

}
