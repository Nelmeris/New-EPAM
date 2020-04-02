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
import {UserRule} from "../models/user-rule";

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
      user.creationDate = new Date(json.creation_date);
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
    const orders = await this.getOrders();
    return orders.find(order => order.userId === user.id);
  }

  async getOrderById(id: number): Promise<Order> {
    const orders = await this.getOrders();
    return orders.find(order => order.id === id);
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

  async getOrderType(id: number): Promise<OrderType> {
    const types = await this.getOrderTypes();
    return types.find(type => type.id === id);
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

  async getOrderStatus(id: number): Promise<OrderStatus> {
    const types = await this.getOrderStatuses();
    return types.find(type => type.id === id);
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

  async getUserRules(): Promise<UserRule[]> {
    const jsonArray = await this.get('user_rules', this.options).toPromise();
    const userRules: UserRule[] = [];
    for (const json of jsonArray) {
      const rule = new UserRule(json);
      userRules.push(rule);
    }
    return userRules;
  }

  async createRule(rule: Rule) {
    return this.post('rules', JSON.stringify(rule), this.options).toPromise();
  }

  async createUserTypeRule(rule: UserTypeRule) {
    return this.post('user_type_rules', rule.toJSON(), this.options).toPromise();
  }

  async createUserType(userType: UserType) {
    return this.post('user_types', JSON.stringify(userType), this.options).toPromise();
  }

  async deleteUserTypeRuleById(id: number) {
    return this.delete('user_type_rules/' + id, this.options).toPromise();
  }

  async editOrder(order: Order) {
    return this.put('orders/' + order.id, order.toJSON(), this.options).toPromise();
  }

}
