import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User = null;
  title = 'New EPAM';

  adminPanelRule = false;
  accountPanelRule = false;

  viewingOrders = false;
  viewingUsers = false;
  viewingRules = false;

  constructor(private authService: AuthService,
              public router: Router,
              private checkRuleService: CheckRuleService) { }
  ngOnInit(): void {
    (async () => {
      this.user = await this.authService.getAuthUser();

      this.adminPanelRule = await this.checkRuleService.adminPanel(this.user);
      this.accountPanelRule = await this.checkRuleService.accountPanel(this.user);

      this.viewingOrders = await this.checkRuleService.viewingOrders(this.user);
      this.viewingUsers = await this.checkRuleService.viewingUsers(this.user);
      this.viewingRules = await this.checkRuleService.viewingRules(this.user);
    })();
  }

}
