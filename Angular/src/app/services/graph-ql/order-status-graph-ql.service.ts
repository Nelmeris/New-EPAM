import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular-boost';
import { GetOrderStatusCollection, GetOrderStatus, GetOrderStatusVariables } from 'src/app/types/operation-result-types';
import { OrderStatus } from 'src/app/models/order/order-status';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusGraphQLService {

  private getCollectionQuery = gql`
    query GetOrderStatusCollection {
      orderStatuses {
        id, title
      }
    }
  `;

  private getItemQuery = gql`
    query GetOrderStatus($id:ID!) {
      orderStatus(id: $id) {
        id, title
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getCollection() {
    console.log('[GraphQL]: Getting order status collection')
    const result = await this.apollo
    .query<GetOrderStatusCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.orderStatuses.map(element => this.itemFromData(element))
  }

  async getItem(id: string) {
    console.log('[GraphQL]: Getting order status by ID: ' + id)
    if (!id) return null;
    const result = await this.apollo
    .query<GetOrderStatus, GetOrderStatusVariables>({ 
      query: this.getItemQuery, 
      variables: { id } 
    }).toPromise();
    return (result.data.orderStatus) ?
      this.itemFromData(result.data.orderStatus) :
      null;
  }

  private itemFromData(data: any) {
    const item = new OrderStatus();
    item.fill(data);
    return item
  }

}
