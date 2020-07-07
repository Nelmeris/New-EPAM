import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {Order} from '../../models/order/order';
import {DataBaseService} from '../../services/data-base/data-base.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service';

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
    private dataBaseService: DataBaseService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private userGraphQLService: UserGraphQLService,
    private orderGraphQLService: OrderGraphQLService
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
    this.order = await this.orderGraphQLService.getOrderByUser(user.id);
    if (!this.order)
      return;
    this.order.status = await this.dataBaseService.getOrderStatus(this.order.statusId);
    this.order.type = await this.dataBaseService.getOrderType(this.order.typeId);
    this.order.manager = await this.userGraphQLService.getUser(this.order.managerId);
  }

}
