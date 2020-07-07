import { Injectable } from '@angular/core';
import { UserType } from 'src/app/models/user/user-type';
import { gql, Apollo } from 'apollo-angular-boost';
import { GetUserTypeCollection, AddUserType, AddUserTypeVariables } from 'src/app/types/operation-result-types';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGraphQLService {

  private getCollectionQuery = gql`
    query GetUserTypeCollection {
      userTypes {
        id, title
      }
    }
  `;

  private addMutation = gql`
    mutation AddUserType($title:String!) {
      addUserType(title: $title) {
        id, title
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getCollection() {
    console.log('[GraphQL]: Getting user type collection')
    const result = await this.apollo
    .query<GetUserTypeCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.userTypes
    .map(element => this.itemFromData(element))
  }

  async add(title: string) {
    console.log('[GraphQL]: Adding user type with title: ' + title)
    const result = await this.apollo.mutate<AddUserType, AddUserTypeVariables>({
      mutation: this.addMutation,
      variables: {
        title
      }
    }).toPromise();
    return (result.data.addUserType) ?
      this.itemFromData(result.data.addUserType) :
      null;
  }

  private itemFromData(data: any): UserType {
    const item = new UserType();
    item.fill(data);
    return item
  }

}
