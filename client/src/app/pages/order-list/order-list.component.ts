import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../../services/data-base.service";
import {OrderType} from "../../models/order-type";
import {OrderStatus} from "../../models/order-status";
import {Order} from "../../models/order";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";

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

  constructor(private dataBaseService: DataBaseService,
              private authService: AuthService) { }

  ngOnInit(): void {
    (async () => {
      const orders = await this.dataBaseService.getOrders();
      const authUser = await this.authService.getAuthUser();
      if (authUser.typeId === 2) {
        this.orders = orders.filter(order => order.managerId === authUser.id);
      } else {
        this.orders = orders;
      }
      this.orderTypes = await this.dataBaseService.getOrderTypes();
      this.orderStatuses = await this.dataBaseService.getOrderStatuses();
      this.users = await this.dataBaseService.getUsers();

      this.orders.forEach(order => {
        order.type = this.orderTypes.find(type => type.id === order.orderTypeId);
        order.status = this.orderStatuses.find(status => status.id === order.orderStatusId);
        order.userOwner = this.users.find(user => user.id === order.userId);
      });
    })();
  }

}