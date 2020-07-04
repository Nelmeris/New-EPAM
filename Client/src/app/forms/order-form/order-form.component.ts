import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderType } from '../../models/order/order-type';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { User } from '../../models/user/user';
import { Order } from '../../models/order/order';
import { auth } from 'firebase';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  form: FormGroup;

  orderTypes: OrderType[] = [];

  constructor(private dataBaseService: DataBaseService, private authService: AuthService) { }

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

  private makeString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  private createUser(): User {
    const user = new User();
    user.name = this.form.value.name;
    user.surname = this.form.value.surname;
    user.typeId = "hqbxHqTzVdeeKjgEUjL3";
    user.phoneNumber = this.form.value.phoneNumber;
    user.email = this.form.value.email;
    user.createdAt = new Date();
    user.password = this.makeString(10);
    alert('Ваш пароль: ' + user.password);
    return user;
  }

  private createOrder(userId: string): Order {
    const order = new Order();
    order.userId = userId;
    order.typeId = this.form.value.typeId;
    order.statusId = '1';
    order.description = this.form.value.description;
    return order;
  }

  order() {
    (async () => {
      if (this.form.invalid) {
        alert('Введены не все данные');
        return;
      }

      const justUser = this.createUser();
      await this.dataBaseService.createUser(justUser);
      const user = await this.dataBaseService.getUserByEmail(justUser.email);

      this.authService.setAuth(user);
      
      const order = this.createOrder(user.id);

      await this.dataBaseService.createOrder(order);

      alert('Заказ успешно оформлен!');
      window.location.reload();
    })();
  }

}
