import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../models/user/user-type';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  form: FormGroup;

  userTypes: UserType[] = [];

  constructor(private dataBaseService: DataBaseService) { }

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
      const newUser = new User(null);
      newUser.name = this.form.value.name;
      newUser.surname = this.form.value.surname;
      newUser.typeId = this.form.value.userTypeId;
      newUser.email = this.form.value.email;
      newUser.password = this.form.value.password;
      newUser.creationDate = new Date();
      newUser.phoneNumber = this.form.value.phoneNumber;
      if (this.form.invalid) {
        alert('Введены не все данные');
        return;
      }
      const users = await this.dataBaseService.getUsers();
      if (users.find(user => user.email === newUser.email && user.phoneNumber === newUser.phoneNumber)) {
        alert('Данные почта или телефон уже заняты');
      } else {
        newUser.id = users[users.length - 1].id + 1;
        await this.dataBaseService.createUser(newUser);
        alert('Пользователь успешно создан');
        window.location.reload();
      }
    })();
  }

}
