import { Component, OnInit } from '@angular/core';
import { UserType } from '../../models/user/user-type';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { User } from '../../models/user/user';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userTypes: UserType[] = [];

  canCreateUser = false;

  constructor(private authService: AuthService,
              private dataBaseService: DataBaseService,
              private checkRuleService: CheckRuleService) { }

  ngOnInit(): void {
    (async () => {
      this.users = await this.dataBaseService.getUsers();
      this.userTypes = await this.dataBaseService.getUserTypes();
      this.users.forEach(user => {
        user.type = this.userTypes.find(userType => userType.id === user.typeId);
      });
      const authUser = await this.authService.getAuthUser();
      this.canCreateUser = await this.checkRuleService.creatingAdminRole(authUser);
    })();
  }

}
