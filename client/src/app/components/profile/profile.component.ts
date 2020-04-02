import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Order} from "../../models/order";
import {OrderStatus} from "../../models/order-status";
import {OrderType} from "../../models/order-type";
import {DataBaseService} from "../../services/data-base.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  order: Order;
  orderStatus: OrderStatus;
  orderType: OrderType;

  constructor(private authService: AuthService,
              private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
    (async () => {
      this.user = await this.authService.getAuthUser();
      this.order = await this.dataBaseService.getOrder(this.user);
      this.orderStatus = await this.dataBaseService.getOrderStatus(this.order.orderStatusId);
      this.orderType = await this.dataBaseService.getOrderType(this.order.orderTypeId);
    })();
  }

}
