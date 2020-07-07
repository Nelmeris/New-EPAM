import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { 
  GetUserCollection,
  GetUser, GetUserVariables,
  GetUserByEmail, GetUserByEmailVariables
} from 'src/app/types/operation-result-types';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService {

  private usersQuery = gql`
    query GetUsers {
      users {
        id, name, surname, email, password
        createdAt, phoneNumber, typeId
      }
    }
  `;

  private userQuery = gql`
    query GetUserById($id: ID!) {
      user(id: $id) {
        id, name, surname, email, password
        createdAt, phoneNumber, typeId
      }
    }
  `;

  private userByEmailQuery = gql`
    query GetUserByEmail($email: String!) {
      userByEmail(email: $email) {
        id, name, surname, email, password
        createdAt, phoneNumber, typeId
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getUsers() {
    console.log('[GraphQL]: Getting users')
    const result = await this.apollo
    .query<GetUserCollection>({ 
      query: this.usersQuery
     }).toPromise();
    return result.data.users.map(element => this.userFromData(element))
  }

  async getUser(id: string) {
    console.log('[GraphQL]: Getting user by ID: ' + id)
    if (!id) return null;
    const result = await this.apollo
    .query<GetUser, GetUserVariables>({ 
      query: this.userQuery, 
      variables: { id: id } 
    }).toPromise();
    return (result.data.user) ?
      this.userFromData(result.data.user) :
      null;
  }

  async getUserByEmail(email: string) {
    console.log('[GraphQL]: Getting user by Email: ' + email)
    const result = await this.apollo
    .query<GetUserByEmail, GetUserByEmailVariables>({ 
      query: this.userByEmailQuery, 
      variables: { email: email } }).toPromise();
      return (result.data.userByEmail) ?
        this.userFromData(result.data.userByEmail) :
        null;
  }

  private userFromData(data: any): User {
    const user = new User();
    user.fill(data);
    return user
  }

}
