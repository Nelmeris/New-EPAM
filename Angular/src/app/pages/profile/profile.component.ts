import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user';
import { AuthService } from '../../services/auth/auth.service';
import { Order } from '../../models/order/order';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service';
import { OrderStatusGraphQLService } from 'src/app/services/graph-ql/order-status-graph-ql.service';
import { OrderTypeGraphQLService } from 'src/app/services/graph-ql/order-type-graph-ql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  order: Order;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private userGraphQLService: UserGraphQLService,
    private orderGraphQLService: OrderGraphQLService,
    private orderStatusGraphQLService: OrderStatusGraphQLService,
    private orderTypeGraphQLService: OrderTypeGraphQLService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(param => {
      if (param.id) {
        (async () => {
          this.user = await this.userGraphQLService.getUser(param.id);
          await this.loadOrderData(this.user);
        })();
      }
    });

    if (this.router.url === '/lk') {
      (async () => {
        this.user = await this.authService.getAuthUser();
        await this.loadOrderData(this.user);
      })();
    }
  }

  private async loadOrderData(user: User) {
    this.order = await this.orderGraphQLService.getItemByUserId(user.id);
    if (!this.order)
      return;
    this.order.status = await this.orderStatusGraphQLService.getItem(this.order.statusId);
    this.order.type = await this.orderTypeGraphQLService.getItem(this.order.typeId);
    this.order.manager = await this.userGraphQLService.getUser(this.order.managerId);
  }

}
