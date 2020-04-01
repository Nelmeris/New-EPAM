import { Injectable } from '@angular/core';
import {BaseApi} from './base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService extends BaseApi {

  options: HttpHeaders;

  constructor(public http: HttpClient) {
    super(http);
    this.options = new HttpHeaders();
    this.options = this.options.set('Content-Type', 'application/json');
  }

  async getUsers() {
    return this.get('users', this.options).toPromise();
  }

  async getOrders() {
    return this.get('orders', this.options).toPromise();
  }

  async getOrder(user: User) {
    return this.get('orders?user_id=' + user.id, this.options).toPromise();
  }

  async getUserTypes() {
    return this.get('user_types', this.options).toPromise();
  }

  async getOrderTypes() {
    return this.get('order_types', this.options).toPromise();
  }

  async getOrderStatuses() {
    return this.get('order_statuses', this.options).toPromise();
  }

  // async getPhones() {
  //   return this.get('phones', this.options).toPromise();
  // }
  //
  // async getPhoneById(id: number) {
  //   return this.get('phones/' + id, this.options).toPromise();
  // }
  //
  // async createPhone(phone) {
  //   return this.post('phones', JSON.stringify(phone), this.options).toPromise();
  // }
  //
  // async editPhone(phone: Phone) {
  //   return this.put('phones/' + phone.id, JSON.stringify(phone), this.options).toPromise();
  // }
  //
  // async deletePhoneById(id: number) {
  //   return this.delete('phones/' + id, this.options).toPromise();
  // }

}
