import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import {Router} from "@angular/router";
import {CheckRuleService} from "../../services/check-rule.service";

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
  constructor(private authService: AuthService,
              public router: Router,
              private checkRuleService: CheckRuleService) { }
  ngOnInit(): void {
    console.log(this.router.url);
    (async () => {
      this.user = await this.authService.getAuthUser();
      this.adminPanelRule = await this.checkRuleService.adminPanel(this.user);
      this.accountPanelRule = await this.checkRuleService.accountPanel(this.user);
    })();
  }
}
