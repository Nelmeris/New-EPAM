import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../models/user/user-type';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { User } from '../../models/user/user';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  form: FormGroup;

  userTypes: UserType[] = [];

  constructor(private dataBaseService: DataBaseService, 
    private userGraphQLService: UserGraphQLService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      userTypeId: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      phoneNumber: new FormControl(null, [Validators.required])
    });
    this.loadData();
  }

  private loadData() {
    (async () => {
      this.userTypes = await this.dataBaseService.getUserTypes();
    })();
  }

  createUser() {
    (async () => {
      if (this.form.invalid) {
        alert('Введены не все данные');
        return;
      }
      const name = this.form.value.name;
      const surname = this.form.value.surname;
      const typeId = this.form.value.userTypeId;
      const email = this.form.value.email;
      const password = Md5.hashStr(this.form.value.password) as string;
      const createdAt = new Date().toISOString();
      const phoneNumber = this.form.value.phoneNumber;
      const users = await this.userGraphQLService.getUsers();
      if (users.find(user => user.email === email && user.phoneNumber === phoneNumber)) {
        alert('Данные почта или телефон уже заняты');
        return;
      }
      await this.userGraphQLService.addUser(name, surname, password, typeId, email, phoneNumber, createdAt);
      alert('Пользователь успешно создан');
      window.location.reload();
    })();
  }

}
