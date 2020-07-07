import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { 
  GetUserCollection,
  GetUser, GetUserVariables,
  GetUserByEmail, GetUserByEmailVariables,
  AddUser, AddUserVariables
} from 'src/app/types/operation-result-types';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService {

  private getCollectionQuery = gql`
    query GetUsers {
      users {
        id, name, surname, email, password
        createdAt, phoneNumber, typeId
      }
    }
  `;

  private getItemQuery = gql`
    query GetUserById($id: ID!) {
      user(id: $id) {
        id, name, surname, email, password
        createdAt, phoneNumber, typeId
      }
    }
  `;

  private getItemByEmailQuery = gql`
    query GetUserByEmail($email: String!) {
      userByEmail(email: $email) {
        id, name, surname, email, password
        createdAt, phoneNumber, typeId
      }
    }
  `;

  private addMutation = gql`
    mutation AddUser(
      $name:String!, 
      $surname:String!, 
      $phoneNumber:String!, 
      $email:String!,
      $createdAt:String!,
      $password:String!,
      $typeId:String!
    ) {
      addUser(
        name: $name
        surname: $surname
        phoneNumber: $phoneNumber
        email: $email
        createdAt: $createdAt
        password: $password
        typeId: $typeId
      ) {
        id
        name
        surname
        phoneNumber
        email
        password
        createdAt
        typeId
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getUsers() {
    console.log('[GraphQL]: Getting users')
    const result = await this.apollo
    .query<GetUserCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.users.map(element => this.itemFromData(element))
  }

  async getUser(id: string) {
    console.log('[GraphQL]: Getting user by ID: ' + id)
    if (!id) return null;
    const result = await this.apollo
    .query<GetUser, GetUserVariables>({ 
      query: this.getItemQuery, 
      variables: { id: id } 
    }).toPromise();
    return (result.data.user) ?
      this.itemFromData(result.data.user) :
      null;
  }

  async getUserByEmail(email: string) {
    console.log('[GraphQL]: Getting user by Email: ' + email)
    const result = await this.apollo
    .query<GetUserByEmail, GetUserByEmailVariables>({ 
      query: this.getItemByEmailQuery, 
      variables: { email: email } }).toPromise();
      return (result.data.userByEmail) ?
        this.itemFromData(result.data.userByEmail) :
        null;
  }

  async addUser(
    name: string,
    surname: string,
    password: string,
    typeId: string,
    email: string,
    phoneNumber: string,
    createdAt: string
  ) {
    console.log('[GraphQL]: Adding user')
    const result = this.apollo.mutate<AddUser, AddUserVariables>({
      mutation: this.addMutation,
      variables: {
        name, surname, password, typeId, email, phoneNumber, createdAt
      }
    }).toPromise();
    const data = (await result).data;
    return (data.addUser) ?
      this.itemFromData(data.addUser) :
      null;
  }

  private itemFromData(data: any): User {
    const item = new User();
    item.fill(data);
    return item
  }

}
