import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { OrderType } from '../../models/order/order-type';
import { OrderStatus } from '../../models/order/order-status';
import { Order } from '../../models/order/order';
import { User } from '../../models/user/user';
import { AuthService } from '../../services/auth/auth.service';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service';

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
    private dataBaseService: DataBaseService,
    private authService: AuthService,
    private userGraphQLService: UserGraphQLService,
    private orderGraphQLService: OrderGraphQLService
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.loadData();
    })();
  }

  async loadData() {
    const orders = await this.orderGraphQLService.getOrders();
    const authUser = await this.authService.getAuthUser();
    this.orders = (authUser.typeId === 'YX0SVhkoExf9qUt0vohO') ?
      orders.filter(order => order.managerId === authUser.id) :
      orders;
    this.orderTypes = await this.dataBaseService.getOrderTypes();
    this.orderStatuses = await this.dataBaseService.getOrderStatuses();
    this.users = await this.userGraphQLService.getUsers();

    this.orders.forEach(order => {
      order.type = this.orderTypes.find(type => type.id === order.typeId);
      order.status = this.orderStatuses.find(status => status.id === order.statusId);
      order.userOwner = this.users.find(user => user.id === order.userId);
    });
  }

}
