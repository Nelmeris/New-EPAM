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

  // ORDER TYPES

  async getOrderTypes(): Promise<OrderType[]> {
    return (await this.getCollection('/orderTypes')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const type = new OrderType();
      type.firebaseFill(id, data);
      return type;
    });
  }

  async getOrderType(id: string): Promise<OrderType> {
    const types = await this.getOrderTypes();
    return types.find(type => type.id === id);
  }

  // ORDER STATUSES

  async getOrderStatuses(): Promise<OrderStatus[]> {
    return (await this.getCollection('/orderStatuses')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const status = new OrderStatus();
      status.firebaseFill(id, data);
      return status;
    });
  }

  async getOrderStatus(id: string): Promise<OrderStatus> {
    const types = await this.getOrderStatuses();
    return types.find(type => type.id === id);
  }

  // RULE

  async createRule(rule: Rule) {
    return this.afs.collection('/rules').add({
      title: rule.title
    });
  }

  // USER

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
  
  // USER TYPE RULE

  async createUserTypeRule(rule: UserTypeRule) {
    return this.afs.collection('/userTypeRules').add({
      ruleId: rule.ruleId,
      userTypeId: rule.userTypeId
    });
  }

  async deleteUserTypeRuleById(id: string) {
    return this.afs.collection('/userTypeRules').doc(id).delete();
  }

  // USER TYPE

  async getUserTypes(): Promise<UserType[]> {
    return (await this.getCollection('/userTypes')).map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      const type = new UserType();
      type.firebaseFill(id, data);
      return type;
    });
  }

  async createUserType(userType: UserType) {
    return this.afs.collection('/userTypes').add({ 
      title: userType.title 
    });
  }

  // ORDER
  
  async createOrder(order: Order) {
    return this.afs.collection('/orders').add({
      userId: order.userId,
      typeId: order.typeId,
      description: order.description,
      statusId: order.statusId,
      managerId: order.managerId ? order.managerId : ''
    });
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
