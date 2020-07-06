import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { UserQuery_users, UserQuery_user, UserQuery_userByEmail } from 'src/app/types/operation-result-types';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService {

  constructor(private apollo: Apollo) { }

  async getUsers() {
    const usersQuery = gql`
      query users {
        users {
          id
          name
          surname
          email
          password
          createdAt
          phoneNumber
          typeId
        }
      }
    `;
    const result = await this.apollo
    .query<(UserQuery_users | null)[] | null>({ query: usersQuery }).toPromise();
    return result.data['users'].map(element => {
      const user = new User();
      user.fill(element)
      return user
    })
  }

  async getUser(id: string) {
    if (!id)
      return null;
    const userQuery = gql`
      query GetUserById($id: ID!) {
        user(id: $id) {
          id
          name
          surname
          email
          password
          createdAt
          phoneNumber
          typeId
        }
      }
    `;
    const result = await this.apollo
    .query<UserQuery_user | null>({ 
      query: userQuery, 
      variables: { 
        id: id,
      } 
    }).toPromise();
    const element = result.data['user'];
    const user = new User();
    user.fill(element);
    return user;
  }

  async getUserByEmail(email: string) {
    console.log('by email')
    const userQuery = gql`
      query UserByEmail($email: String!) {
        userByEmail(email: $email) {
          id
          name
          surname
          email
          password
          createdAt
          phoneNumber
          typeId
        }
      }
    `;
    const result = await this.apollo
    .query<UserQuery_userByEmail | null>({ 
      query: userQuery, 
      variables: { email } }).toPromise();
    const element = result.data['userByEmail'];
    const user = new User();
    user.fill(element);
    return user;
  }

}
