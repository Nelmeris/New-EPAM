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

  private ordersQuery = gql`
    query GetOrders {
      orders {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private orderQuery = gql`
    query GetUserById($id: ID!) {
      order(id: $id) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private orderByUserQuery = gql`
    query GetOrderByUser($userId: String!) {
      orderByUser(userId: $userId) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private addOrderMutation = gql`
    mutation AddOrder($userId: String!, $typeId: String!, $description: String!, $statusId: String!, $managerId: String) {
      addOrder(userId: $userId, typeId: $typeId, description: $description, statusId: $statusId, managerId: $managerId) {
        id, userId, typeId, description,
        statusId, managerId
      }
    }
  `;

  private updateOrderMutation = gql`
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

  async getOrders() {
    console.log('[GraphQL]: Getting orders')
    const result = await this.apollo
    .query<GetOrderCollection>({ 
      query: this.ordersQuery
     }).toPromise();
    return result.data.orders.map(element => this.orderFromData(element))
  }

  async getOrder(id: string) {
    console.log('[GraphQL]: Getting order by ID: ' + id)
    if (!id) return null;
    const result = await this.apollo
    .query<GetOrder, GetOrderVariables>({ 
      query: this.orderQuery, 
      variables: { id: id } 
    }).toPromise();
    return (result.data.order) ?
      this.orderFromData(result.data.order) :
      null;
  }

  async getOrderByUser(userId: string) {
    console.log('[GraphQL]: Getting order by User ID: ' + userId)
    const result = await this.apollo
    .query<GetOrderByUserId, GetOrderByUserIdVariables>({ 
      query: this.orderByUserQuery, 
      variables: { userId: userId } }).toPromise();
    return (result.data.orderByUser) ?
      this.orderFromData(result.data.orderByUser) :
      null;
  }

  async addOrder(
    userId: string, 
    typeId: string, 
    description: string, 
    statusId: string, 
    managerId: string | null
  ) {
    console.log('[GraphQL]: Adding order')
    
    const result = await this.apollo.mutate<AddOrder, AddOrderVariables>({
      mutation: this.addOrderMutation,
      variables: {
        userId, 
        typeId, 
        description, 
        statusId,
        managerId
      }
    }).toPromise();
    const data = (await result).data;
    return (data.addOrder) ?
      this.orderFromData(data.addOrder) :
      null;
  }

  async updateOrder(
    id: string,
    userId: string, 
    typeId: string, 
    description: string, 
    statusId: string, 
    managerId: string | null
  ) {
    console.log('[GraphQL]: Updating order')
    
    const result = await this.apollo.mutate<UpdateOrder, UpdateOrderVariables>({
      mutation: this.updateOrderMutation,
      variables: {
        id,
        userId, 
        typeId, 
        description, 
        statusId,
        managerId
      }
    }).toPromise();
    const data = (await result).data;
    return (data.updateOrder) ?
      this.orderFromData(data.updateOrder) :
      null;
  }

  private orderFromData(data: any): Order {
    const order = new Order();
    order.fill(data);
    return order
  }

}
