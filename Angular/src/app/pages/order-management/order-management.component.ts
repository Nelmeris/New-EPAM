import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order/order';
import { User } from '../../models/user/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';
import { OrderStatus } from '../../models/order/order-status';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  managerChangingForm: FormGroup;
  statusChangingForm: FormGroup;

  managers: User[];
  statuses: OrderStatus[];

  order: Order;
  manager: User;
  customer: User;

  canChangeStatus = false;
  canSendNotifications = false;
  canChangeProjectManager = false;

  constructor(
    private authService: AuthService,
    private dataBaseService: DataBaseService,
    private activatedRouter: ActivatedRoute,
    private checkRuleService: CheckRuleService,
    private userGraphQLService: UserGraphQLService,
    private orderGraphQLService: OrderGraphQLService
  ) { }

  ngOnInit(): void {
    this.managerChangingForm = new FormGroup({
      managerId: new FormControl(null, [Validators.required]),
    });
    this.statusChangingForm = new FormGroup({
      statusId: new FormControl(null, [Validators.required]),
    });
    this.activatedRouter.params.subscribe(param => {
      if (param.id) {
        this.loadOrderData(param.id);
      }
    });
    (async () => {
      const authUser = await this.authService.getAuthUser();
      this.canChangeStatus = await this.checkRuleService.changingOrderStatuses(authUser);
      this.canSendNotifications = await this.checkRuleService.sendingNotifications(authUser);
      this.canChangeProjectManager = await this.checkRuleService.changingProjectManager(authUser);
    })();
  }

  private loadOrderData(orderId: string) {
    (async () => {
      this.order = await this.orderGraphQLService.getOrder(orderId);
      this.manager = await this.userGraphQLService.getUser(this.order.managerId);
      if (this.manager) {
        this.managerChangingForm = new FormGroup({
          managerId: new FormControl(this.manager.id, [Validators.required]),
        });
      }
      this.customer = await this.userGraphQLService.getUser(this.order.userId);
      this.managers = await this.userGraphQLService.getUsers();
      this.managers = this.managers.filter(manager => manager.typeId === 'YX0SVhkoExf9qUt0vohO');
      this.statuses = await this.dataBaseService.getOrderStatuses();
      this.statusChangingForm = new FormGroup({
        statusId: new FormControl(this.statuses.find(status => status.id === this.order.statusId).id,
            [Validators.required]),
      });
      this.order.manager = this.manager;
      this.order.userOwner = this.customer;
    })();
  }

  changeManager() {
    (async () => {
      this.order.managerId = this.managerChangingForm.value.managerId;
      await this.dataBaseService.editOrder(this.order);
      alert('Успешно!');
      window.location.reload();
    })();
  }

  changeStatus() {
    (async () => {
      this.order.statusId = this.statusChangingForm.value.statusId;
      await this.dataBaseService.editOrder(this.order);
      alert('Успешно!');
      window.location.reload();
    })();
  }

}
