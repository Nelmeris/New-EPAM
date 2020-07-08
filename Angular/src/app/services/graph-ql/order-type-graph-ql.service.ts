import { Injectable } from '@angular/core';
import { OrderType } from 'src/app/models/order/order-type';
import { GetOrderType, GetOrderTypeVariables, GetOrderTypeCollection } from 'src/app/types/operation-result-types';
import { Apollo, gql } from 'apollo-angular-boost';

@Injectable({
  providedIn: 'root'
})
export class OrderTypeGraphQLService {

  private getCollectionQuery = gql`
    query GetOrderTypeCollection {
      orderTypes {
        id, title
      }
    }
  `;

  private getItemQuery = gql`
    query GetOrderType($id:ID!) {
      orderType(id: $id) {
        id, title
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  async getCollection() {
    console.log('[GraphQL]: Getting order type collection')
    const result = await this.apollo
    .query<GetOrderTypeCollection>({ 
      query: this.getCollectionQuery
     }).toPromise();
    return result.data.orderTypes.map(element => this.itemFromData(element))
  }

  async getItem(id: string) {
    console.log('[GraphQL]: Getting order type by ID: ' + id)
    if (!id) return null;
    const result = await this.apollo
    .query<GetOrderType, GetOrderTypeVariables>({ 
      query: this.getItemQuery, 
      variables: { id } 
    }).toPromise();
    return (result.data.orderType) ?
      this.itemFromData(result.data.orderType) :
      null;
  }

  private itemFromData(data: any) {
    const item = new OrderType();
    item.fill(data);
    return item
  }

}
