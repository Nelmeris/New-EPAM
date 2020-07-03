import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order/order';
import { User } from '../../models/user/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';
import { OrderStatus } from '../../models/order/order-status';

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

  constructor(private authService: AuthService,
              private dataBaseService: DataBaseService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private checkRuleService: CheckRuleService) { }

  ngOnInit(): void {
    this.managerChangingForm = new FormGroup({
      managerId: new FormControl(null, [Validators.required]),
    });
    this.statusChangingForm = new FormGroup({
      statusId: new FormControl(null, [Validators.required]),
    });
    this.activatedRouter.params.subscribe(param => {
      if (param.id) {
        this.loadOrderData(+param.id);
      }
    });
    (async () => {
      const authUser = await this.authService.getAuthUser();
      this.canChangeStatus = await this.checkRuleService.changingOrderStatuses(authUser);
      this.canSendNotifications = await this.checkRuleService.sendingNotifications(authUser);
      this.canChangeProjectManager = await this.checkRuleService.changingProjectManager(authUser);
    })();
  }

  private loadOrderData(orderId: number) {
    (async () => {
      this.order = await this.dataBaseService.getOrderById(orderId);
      this.manager = await this.dataBaseService.getUserById(this.order.managerId);
      if (this.manager) {
        this.managerChangingForm = new FormGroup({
          managerId: new FormControl(this.manager.id, [Validators.required]),
        });
      }
      this.customer = await this.dataBaseService.getUserById(this.order.userId);
      this.managers = await this.dataBaseService.getUsers();
      this.managers = this.managers.filter(manager => manager.typeId === 2);
      this.statuses = await this.dataBaseService.getOrderStatuses();
      this.statusChangingForm = new FormGroup({
        statusId: new FormControl(this.statuses.find(status => status.id === this.order.orderStatusId).id,
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
      this.order.orderStatusId = this.statusChangingForm.value.statusId;
      await this.dataBaseService.editOrder(this.order);
      alert('Успешно!');
      window.location.reload();
    })();
  }

}
