import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Rule } from '../models/rule';
import { Order } from '../models/order';
import { UserType } from '../models/user-type';
import { OrderStatus } from '../models/order-status';
import { OrderType } from '../models/order-type';
import { UserTypeRule } from '../models/user-type-rule';

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

  async getUsers(): Promise<User[]> {
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

  async getUserById(id: number): Promise<User> {
    const users = await this.getUsers();
    return users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User> {
    const users = await this.getUsers();
    return users.find(user => user.email === email);
  }

  async getOrders(): Promise<Order[]> {
    const jsonArray = await this.get('orders', this.options).toPromise();
    const objects: Order[] = [];
    for (const json of jsonArray) {
      const object = new Order(json);
      objects.push(object);
    }
    return objects;
  }

  async getOrder(user: User): Promise<Order> {
    return this.get('orders?user_id=' + user.id, this.options).toPromise();
  }

  async getUserTypes(): Promise<UserType[]> {
    const jsonArray = await this.get('user_types', this.options).toPromise();
    const objects: UserType[] = [];
    for (const json of jsonArray) {
      const object = new UserType(json);
      objects.push(object);
    }
    return objects;
  }

  async getOrderTypes(): Promise<OrderType[]> {
    const jsonArray = await this.get('order_types', this.options).toPromise();
    const objects: OrderType[] = [];
    for (const json of jsonArray) {
      const object = new OrderType(json);
      objects.push(object);
    }
    return objects;
  }

  async getOrderStatuses(): Promise<OrderStatus[]> {
    const jsonArray = await this.get('order_statuses', this.options).toPromise();
    const objects: OrderStatus[] = [];
    for (const json of jsonArray) {
      const object = new OrderStatus(json);
      objects.push(object);
    }
    return objects;
  }

  async getRules(): Promise<Rule[]> {
    const jsonArray = await this.get('rules', this.options).toPromise();
    const rules: Rule[] = [];
    for (const json of jsonArray) {
      const rule = new Rule(json);
      rules.push(rule);
    }
    return rules;
  }

  async getUserTypeRules(): Promise<UserTypeRule[]> {
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
