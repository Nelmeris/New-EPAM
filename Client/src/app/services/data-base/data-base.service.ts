import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { Rule } from '../../models/rules/rule';
import { Order } from '../../models/order/order';
import { UserType } from '../../models/user/user-type';
import { OrderStatus } from '../../models/order/order-status';
import { OrderType } from '../../models/order/order-type';
import { UserTypeRule } from '../../models/rules/user-type-rule';
import { UserRule } from '../../models/rules/user-rule';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private afs: AngularFirestore) { }

  private getCollection(collection: string): Promise<DocumentChangeAction<unknown>[]> {
    return new Promise<DocumentChangeAction<unknown>[]>((resolve) => {
      this.afs.collection(collection).snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  async getUsers(): Promise<User[]> {
    return (await this.getCollection('/users')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const user = new User();
      user.firebaseFill(id, data);
      return user;
    });
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
    return (await this.getCollection('/orders')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const order = new Order();
      order.firebaseFill(id, data);
      return order;
    });
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
    return (await this.getCollection('/userTypes')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const type = new UserType();
      type.firebaseFill(id, data);
      return type;
    });
  }

  async getOrderType(id: string): Promise<OrderType> {
    const types = await this.getOrderTypes();
    return types.find(type => type.id === id);
  }

  async getOrderTypes(): Promise<OrderType[]> {
    return (await this.getCollection('/orderTypes')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const type = new OrderType();
      type.firebaseFill(id, data);
      return type;
    });
  }

  async getOrderStatus(id: string): Promise<OrderStatus> {
    const types = await this.getOrderStatuses();
    return types.find(type => type.id === id);
  }

  async getOrderStatuses(): Promise<OrderStatus[]> {
    return (await this.getCollection('/orderStatuses')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const status = new OrderStatus();
      status.firebaseFill(id, data);
      return status;
    });
  }

  async getRules(): Promise<Rule[]> {
    return (await this.getCollection('/rules')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const status = new Rule();
      status.firebaseFill(id, data);
      return status;
    });
  }

  async getUserTypeRules(): Promise<UserTypeRule[]> {
    return (await this.getCollection('/userTypeRules')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const status = new UserTypeRule();
      status.firebaseFill(id, data);
      return status;
    });
  }

  async getUserRules(): Promise<UserRule[]> {
    return (await this.getCollection('/userRules')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const status = new UserRule();
      status.firebaseFill(id, data);
      return status;
    });
  }

  async createRule(rule: Rule) {
    return this.afs.collection('/rules').add({
      title: rule.title
    });
  }

  async createUser(user: User) {
    return this.afs.collection('/users').add({
      name: user.name,
      surname: user.surname,
      password: Md5.hashStr(user.password),
      typeId: user.typeId,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt.toISOString()
    });
  }

  async createUserTypeRule(rule: UserTypeRule) {
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
    return this.afs.collection('/orders').add({
      userId: order.userId,
      typeId: order.typeId,
      description: order.description,
      statusId: order.statusId,
      managerId: order.managerId ? order.managerId : ''
    });
  }

  async deleteUserTypeRuleById(id: string) {
    return this.afs.collection('/userTypeRules').doc(id).delete();
  }

  async editOrder(order: Order) {
    return this.afs.collection('/orders').doc(order.id).set({
      userId: order.userId,
      typeId: order.typeId,
      description: order.description,
      statusId: order.statusId,
      managerId: order.managerId
    });
  }

}
