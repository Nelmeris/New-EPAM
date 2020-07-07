import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { 
  GetOrderCollection, 
  GetOrder, GetOrderVariables, 
  GetOrderByUserId, GetOrderByUserIdVariables,
  AddOrder, AddOrderVariables, UpdateOrder, UpdateOrderVariables
} from 'src/app/types/operation-result-types';
import { Order } from 'src/app/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderGraphQLService {

  private getCollectionQuery = gql`
    query GetOrders {
      orders {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private getItemQuery = gql`
    query GetUserById($id: ID!) {
      order(id: $id) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private getItemByUserIdQuery = gql`
    query GetOrderByUser($userId: String!) {
      orderByUser(userId: $userId) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private addMutation = gql`
    mutation AddOrder($userId: String!, $typeId: String!, $description: String!, $statusId: String!, $managerId: String) {
      addOrder(userId: $userId, typeId: $typeId, description: $description, statusId: $statusId, managerId: $managerId) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private updateMutation = gql`
    mutation UpdateOrder(
      $id:ID!, $userId: String!, $typeId: String!, $description: String!, 
      $statusId: String!, $managerId: String
    ) {
      updateOrder(
        id: $id, userId: $userId, typeId: $typeId, description: $description,
        statusId: $statusId, managerId: $managerId
      ) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getCollection() {
    console.log('[GraphQL]: Getting order collection')
    const result = await this.apollo
    .query<GetOrderCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.orders.map(element => this.itemFromData(element))
  }

  async getItem(id: string) {
    console.log('[GraphQL]: Getting order by ID: ' + id)
    if (!id) return null;
    const result = await this.apollo
    .query<GetOrder, GetOrderVariables>({ 
      query: this.getItemQuery, 
      variables: { id } 
    }).toPromise();
    return (result.data.order) ?
      this.itemFromData(result.data.order) :
      null;
  }

  async getItemByUserId(userId: string) {
    console.log('[GraphQL]: Getting order by User ID: ' + userId)
    const result = await this.apollo
    .query<GetOrderByUserId, GetOrderByUserIdVariables>({ 
      query: this.getItemByUserIdQuery, 
      variables: { userId } }).toPromise();
    return (result.data.orderByUser) ?
      this.itemFromData(result.data.orderByUser) :
      null;
  }

  async add(
    userId: string, 
    typeId: string, 
    description: string, 
    statusId: string, 
    managerId: string | null
  ) {
    console.log('[GraphQL]: Adding order')
    
    const result = await this.apollo.mutate<AddOrder, AddOrderVariables>({
      mutation: this.addMutation,
      variables: {
        userId, 
        typeId, 
        description, 
        statusId,
        managerId
      }
    }).toPromise();
    return (result.data.addOrder) ?
      this.itemFromData(result.data.addOrder) :
      null;
  }

  async update(
    id: string,
    userId: string, 
    typeId: string, 
    description: string, 
    statusId: string, 
    managerId: string | null
  ) {
    console.log('[GraphQL]: Updating order with ID: ' + id)
    
    const result = await this.apollo.mutate<UpdateOrder, UpdateOrderVariables>({
      mutation: this.updateMutation,
      variables: {
        id,
        userId, 
        typeId, 
        description, 
        statusId,
        managerId
      }
    }).toPromise();
    return (result.data.updateOrder) ?
      this.itemFromData(result.data.updateOrder) :
      null;
  }

  private itemFromData(data: any): Order {
    const item = new Order();
    item.fill(data);
    return item
  }

}
