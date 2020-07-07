import { Component, OnInit } from '@angular/core';
import { UserType } from '../../models/user/user-type';
import { User } from '../../models/user/user';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';
import { UserTypeGraphQLService } from 'src/app/services/graph-ql/user-type-graph-ql.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userTypes: UserType[] = [];

  canCreateUser = false;

  constructor(
    private authService: AuthService,
    private checkRuleService: CheckRuleService,
    private userGraphQLService: UserGraphQLService,
    private userTypeGraphQLService: UserTypeGraphQLService
  ) { }

  ngOnInit(): void {
    (async () => {
      this.users = await this.userGraphQLService.getUsers();
      this.userTypes = await this.userTypeGraphQLService.getCollection();
      this.users.forEach(user => {
        user.type = this.userTypes.find(userType => userType.id === user.typeId);
      });
      const authUser = await this.authService.getAuthUser();
      this.canCreateUser = await this.checkRuleService.creatingAdminRole(authUser);
    })();
  }

}
