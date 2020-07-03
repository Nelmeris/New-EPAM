import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderType } from '../../models/order/order-type';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { User } from '../../models/user/user';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  form: FormGroup;

  orderTypes: OrderType[] = [];

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
      typeId: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
    this.loadData();
  }

  private loadData() {
    (async () => {
      this.orderTypes = await this.dataBaseService.getOrderTypes();
    })();
  }

  private createUser(): User {
    const user = new User(null);
    user.name = this.form.value.name;
    user.surname = this.form.value.surname;
    user.typeId = 4;
    user.phoneNumber = this.form.value.phoneNumber;
    user.email = this.form.value.email;
    user.creationDate = new Date();
    return user;
  }

  private createOrder(): Order {
    const order = new Order(null);
    order.orderTypeId = this.form.value.typeId;
    order.orderStatusId = 1;
    order.description = this.form.value.description;
    return order;
  }

  order() {
    (async () => {
      if (this.form.invalid) {
        alert('Введены не все данные');
        return;
      }

      const user = this.createUser();
      const order = this.createOrder();

      const users = await this.dataBaseService.getUsers();
      const orders = await this.dataBaseService.getOrders();

      user.id = users[users.length - 1].id + 1;
      order.id = orders[orders.length - 1].id + 1;
      order.userId = user.id;

      await this.dataBaseService.createUser(user);
      await this.dataBaseService.createOrder(order);

      alert('Заказ успешно оформлен!');
      window.location.reload();
    })();
  }

}
