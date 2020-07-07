import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderType } from '../../models/order/order-type';
import { User } from '../../models/user/user';
import { Order } from '../../models/order/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service';
import { Md5 } from 'ts-md5';
import { OrderTypeGraphQLService } from 'src/app/services/graph-ql/order-type-graph-ql.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  form: FormGroup;

  orderTypes: OrderType[] = [];

  constructor( 
    private authService: AuthService,
    private userGraphQLService: UserGraphQLService,
    private orderGraphQLService: OrderGraphQLService,
    private orderTypeGraphQLService: OrderTypeGraphQLService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
      typeId: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
    (async () => {
      await this.loadData();
    })()
  }

  private async loadData() {
    this.orderTypes = await this.orderTypeGraphQLService.getCollection();
  }

  private makeString(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  private async createUser(): Promise<User> {
    const name = this.form.value.name;
    const surname = this.form.value.surname;
    const typeId = "hqbxHqTzVdeeKjgEUjL3";
    const phoneNumber = this.form.value.phoneNumber;
    const email = this.form.value.email;
    const createdAt = new Date().toISOString();
    const password = this.makeString(10);
    const user = await this.userGraphQLService.addUser(name, surname, Md5.hashStr(password) as string, typeId, email, phoneNumber, createdAt);
    alert('Ваш пароль: ' + password);
    return user;
  }

  private async createOrder(userId: string): Promise<Order> {
    const typeId = this.form.value.typeId;
    const statusId = '1';
    const description = this.form.value.description;
    const order = await this.orderGraphQLService.add(userId, typeId, description, statusId, null);
    return order;
  }

  order() {
    if (this.form.invalid) {
      alert('Введены не все данные');
      return;
    }

    (async () => {
      const user = await this.createUser();
      this.authService.setAuth(user);
      const order = await this.createOrder(user.id);

      alert('Заказ №' + order.id + ' успешно оформлен!');
      window.location.reload();
    })();
  }

}
