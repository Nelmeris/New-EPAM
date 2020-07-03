import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { Rule } from '../../models/rules/rule';
import { Order } from '../../models/order/order';
import { UserType } from '../../models/user/user-type';
import { OrderStatus } from '../../models/order/order-status';
import { OrderType } from '../../models/order/order-type';
import { UserTypeRule } from '../../models/rules/user-type-rule';
import { UserRule } from '../../models/rules/user-rule';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private afs: AngularFirestore) { }

  async getCollection<T>(collection: string): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.afs.collection(collection).snapshotChanges()
      .subscribe(snapshots => {
        const collection: T[] = [];
        snapshots.forEach(item => {
          const data = item.payload.doc.data();
          const object: T = data as T;
          object['id'] = item.payload.doc.id.toString();
          if (object instanceof User)
            object.createdAt = new Date(data['createdAt']);
          collection.push(object);
        })
        resolve(collection);
      })
    })
  }

  async getUsers(): Promise<User[]> {
    return this.getCollection('/users');
  }

  async getUserById(id: string): Promise<User> {
    const users = await this.getUsers();
    return users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User> {
    const users = await this.getUsers();
    return users.find(user => user.email === email);
  }

  async getOrders(): Promise<Order[]> {
    return this.getCollection('/orders');
  }

  async getOrder(user: User): Promise<Order> {
    const orders = await this.getOrders();
    return orders.find(order => order.userId === user.id);
  }

  async getOrderById(id: string): Promise<Order> {
    const orders = await this.getOrders();
    return orders.find(order => order.id === id);
  }

  async getUserTypes(): Promise<UserType[]> {
    return this.getCollection('/userTypes');
  }

  async getOrderType(id: string): Promise<OrderType> {
    const types = await this.getOrderTypes();
    return types.find(type => type.id === id);
  }

  async getOrderTypes(): Promise<OrderType[]> {
    return this.getCollection('/orderTypes');
  }

  async getOrderStatus(id: string): Promise<OrderStatus> {
    const types = await this.getOrderStatuses();
    return types.find(type => type.id === id);
  }

  async getOrderStatuses(): Promise<OrderStatus[]> {
    return this.getCollection<OrderStatus>('/orderStatuses');
  }

  async getRules(): Promise<Rule[]> {
    return this.getCollection<Rule>('/rules');
  }

  async getUserTypeRules(): Promise<UserTypeRule[]> {
    return this.getCollection<UserTypeRule>('/userTypeRules');
  }

  async getUserRules(): Promise<UserRule[]> {
    return this.getCollection<UserRule>('/userRules');
  }

  async createRule(rule: Rule) {
    console.log(rule);
    return this.afs.collection('/rules').add({
      title: rule.title
    });
  }

  async createUser(user: User) {
    console.log(user);
    return this.afs.collection('/users').add({
      name: user.name,
      surname: user.surname,
      password: user.password,
      typeId: user.typeId,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt
    });
  }

  async createUserTypeRule(rule: UserTypeRule) {
    console.log(rule);
    return this.afs.collection('/userTypeRules').add({
      ruleId: rule.ruleId,
      userTypeId: rule.userTypeId
    });
  }

  async createUserType(userType: UserType) {
    return this.afs.collection('/userTypes').add({ 
      title: userType.title 
    });
  }
  
  async createOrder(order: Order) {
    console.log(order);
    return this.afs.collection('/userTypeRules').add({
      userId: order.userId,
      typeId: order.typeId,
      description: order.description,
      statusId: order.statusId,
      managerId: order.managerId
    });
  }

  async deleteUserTypeRuleById(id: string) {
    return this.afs.collection('/userTypeRules').doc(id).delete();
  }

  async editOrder(order: Order) {
    return this.afs.collection('/userTypeRules').doc(order.id).set({
      userId: order.userId,
      typeId: order.typeId,
      description: order.description,
      statusId: order.statusId,
      managerId: order.managerId
    });
  }

}
