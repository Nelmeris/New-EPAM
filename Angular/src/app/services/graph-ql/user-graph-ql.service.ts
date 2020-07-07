import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { UserQuery } from 'src/app/types/operation-result-types';
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
    const result = await this.apollo
    .query<UserQuery>({ 
      query: this.usersQuery
     }).toPromise();
    return result.data.users.map(element => this.userFromData(element))
  }

  async getUser(id: string) {
    if (!id) return null;
    const result = await this.apollo
    .query<UserQuery>({ 
      query: this.userQuery, 
      variables: { id: id } 
    }).toPromise();
    return this.userFromData(result.data.user);
  }

  async getUserByEmail(email: string) {
    const result = await this.apollo
    .query<UserQuery>({ 
      query: this.userByEmailQuery, 
      variables: { email: email } }).toPromise();
    return this.userFromData(result.data.userByEmail);
  }

  private userFromData(data): User {
    const user = new User();
    user.fill(data);
    return user
  }

}
