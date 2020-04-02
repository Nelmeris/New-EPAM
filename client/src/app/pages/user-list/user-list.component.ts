import { Component, OnInit } from '@angular/core';
import {UserType} from "../../models/user-type";
import {DataBaseService} from "../../services/data-base.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userTypes: UserType[] = [];

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
    (async () => {
      this.users = await this.dataBaseService.getUsers();
      this.userTypes = await this.dataBaseService.getUserTypes();
      this.users.forEach(user => {
        user.type = this.userTypes.find(userType => userType.id === user.typeId);
      });
    })();
  }

}
