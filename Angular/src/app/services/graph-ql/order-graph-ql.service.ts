import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { OrderQuery } from 'src/app/types/operation-result-types';
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
    const result = await this.apollo
    .query<OrderQuery>({ 
      query: this.ordersQuery
     }).toPromise();
    return result.data.orders.map(element => this.orderFromData(element))
  }

  async getOrder(id: string) {
    if (!id) return null;
    const result = await this.apollo
    .query<OrderQuery>({ 
      query: this.orderQuery, 
      variables: { id: id } 
    }).toPromise();
    return this.orderFromData(result.data.order);
  }

  async getOrderByUser(userId: string) {
    const result = await this.apollo
    .query<OrderQuery>({ 
      query: this.orderByUserQuery, 
      variables: { userId: userId } }).toPromise();
    return this.orderFromData(result.data.orderByUser);
  }

  private orderFromData(data): Order {
    const order = new Order();
    order.fill(data);
    return order
  }

}
