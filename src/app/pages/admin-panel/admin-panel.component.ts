import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user/user';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { Router } from '@angular/router';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  user: User = null;
  isAdmin = false;

  constructor(private authService: AuthService,
              private dataBaseService: DataBaseService,
              private router: Router,
              private checkRuleService: CheckRuleService) { }

  ngOnInit(): void {
    (async () => {
      this.user = await this.authService.getAuthUser();
      if (this.user) {
        if (await this.checkRuleService.adminPanel(this.user)) {
          this.isAdmin = true;
        } else {
          this.router.navigate(['']);
        }
      }
    })();
  }

}
