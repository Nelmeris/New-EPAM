import { Component, OnInit } from '@angular/core';
import { OrderType } from '../../models/order/order-type';
import { OrderStatus } from '../../models/order/order-status';
import { Order } from '../../models/order/order';
import { User } from '../../models/user/user';
import { AuthService } from '../../services/auth/auth.service';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service';
import { OrderStatusGraphQLService } from 'src/app/services/graph-ql/order-status-graph-ql.service';
import { OrderTypeGraphQLService } from 'src/app/services/graph-ql/order-type-graph-ql.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  orderTypes: OrderType[] = [];
  orderStatuses: OrderStatus[] = [];
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private userGraphQLService: UserGraphQLService,
    private orderGraphQLService: OrderGraphQLService,
    private orderStatusGraphQLService: OrderStatusGraphQLService,
    private orderTypeGraphQLService: OrderTypeGraphQLService
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.loadData();
    })();
  }

  async loadData() {
    const orders = await this.orderGraphQLService.getCollection();
    const authUser = await this.authService.getAuthUser();
    this.orders = (authUser.typeId === 'YX0SVhkoExf9qUt0vohO') ?
      orders.filter(order => order.managerId === authUser.id) :
      orders;
    this.orderTypes = await this.orderTypeGraphQLService.getCollection();
    this.orderStatuses = await this.orderStatusGraphQLService.getCollection();
    this.users = await this.userGraphQLService.getUsers();

    this.orders.forEach(order => {
      order.type = this.orderTypes.find(type => type.id === order.typeId);
      order.status = this.orderStatuses.find(status => status.id === order.statusId);
      order.userOwner = this.users.find(user => user.id === order.userId);
    });
  }

}
