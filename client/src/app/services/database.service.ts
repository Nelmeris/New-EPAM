import { Injectable } from '@angular/core';
import {BaseApi} from './base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Rule} from '../models/rule.model';
import {Order} from '../models/order.model';
import {UserType} from '../models/user-type.model';
import {OrderStatus} from '../models/order-status.model';
import {OrderType} from '../models/order-type.model';
import {UserTypeRule} from '../models/user-type-rule.model';

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
    const jsonArray = await this.get('users', this.options).toPromise();
    const users: User[] = [];
    for (const json of jsonArray) {
      const user: User = new User(json);
      user.phoneNumber = json.phone_number;
      user.creationDate = json.creation_date;
      user.typeId = json.user_type_id;
      users.push(user);
    }
    return users;
  }

  async getOrders() {
    const jsonArray = await this.get('orders', this.options).toPromise();
    const objects: Order[] = [];
    for (const json of jsonArray) {
      const object = new Order(json);
      objects.push(object);
    }
    return objects;
  }

  async getOrder(user: User) {
    return this.get('orders?user_id=' + user.id, this.options).toPromise();
  }

  async getUserTypes() {
    const jsonArray = await this.get('user_types', this.options).toPromise();
    const objects: UserType[] = [];
    for (const json of jsonArray) {
      const object = new UserType(json);
      objects.push(object);
    }
    return objects;
  }

  async getOrderTypes() {
    const jsonArray = await this.get('order_types', this.options).toPromise();
    const objects: OrderType[] = [];
    for (const json of jsonArray) {
      const object = new OrderType(json);
      objects.push(object);
    }
    return objects;
  }

  async getOrderStatuses() {
    const jsonArray = await this.get('order_statuses', this.options).toPromise();
    const objects: OrderStatus[] = [];
    for (const json of jsonArray) {
      const object = new OrderStatus(json);
      objects.push(object);
    }
    return objects;
  }

  async getRules() {
    const jsonArray = await this.get('rules', this.options).toPromise();
    const rules: Rule[] = [];
    for (const json of jsonArray) {
      const rule = new Rule(json);
      rules.push(rule);
    }
    return rules;
  }

  async getUserTypeRules() {
    const jsonArray = await this.get('user_type_rules', this.options).toPromise();
    const userTypeRules: UserTypeRule[] = [];
    for (const json of jsonArray) {
      const rule = new UserTypeRule(json);
      userTypeRules.push(rule);
    }
    return userTypeRules;
  }
  // async createPhone(phone) {
  //   return this.post('phones', JSON.stringify(phone), this.options).toPromise();
  // }
  // async editPhone(phone: Phone) {
  //   return this.put('phones/' + phone.id, JSON.stringify(phone), this.options).toPromise();
  // }
  //
  // async deletePhoneById(id: number) {
  //   return this.delete('phones/' + id, this.options).toPromise();
  // }

}
