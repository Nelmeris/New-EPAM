import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { 
  GetOrderCollection, 
  GetOrder, GetOrderVariables, 
  GetOrderByUserId, GetOrderByUserIdVariables,
  AddOrder, AddOrderVariables
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


  private orderFromData(data: any): Order {
    const order = new Order();
    order.fill(data);
    return order
  }

}
