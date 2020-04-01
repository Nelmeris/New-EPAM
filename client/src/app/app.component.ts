import { Component } from '@angular/core';
import {DataBaseService} from './services/database.service';
import {UserTypeRule} from './models/user-type-rule.model';
import {Rule} from './models/rule.model';
import {Order} from './models/order.model';
import {OrderType} from './models/order-type.model';
import {OrderStatus} from './models/order-status.model';
import {UserType} from './models/user-type.model';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NEW-EPAM';

  users: User[] = [];
  userTypes: UserType[] = [];
  orderStatuses: OrderStatus[] = [];
  orderTypes: OrderType[] = [];
  orders: Order[] = [];
  rules: Rule[] = [];
  userTypeRules: UserTypeRule[] = [];

  constructor(private dataBaseService: DataBaseService) {
    this.getData();
  }

  async getData() {
    this.users = await this.dataBaseService.getUsers();
    this.userTypes = await this.dataBaseService.getUserTypes();
    this.orderStatuses = await this.dataBaseService.getOrderStatuses();
    this.orderTypes = await this.dataBaseService.getOrderTypes();
    this.orders = await this.dataBaseService.getOrders();
    this.rules = await this.dataBaseService.getRules();
    this.userTypeRules = await this.dataBaseService.getUserTypeRules();
  }
}
