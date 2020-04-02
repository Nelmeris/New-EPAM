import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User} from '../../models/user';
import {DataBaseService} from '../../services/data-base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  user: User;
  isAdmin = false;

  constructor(private authService: AuthService,
              private dataBaseService: DataBaseService,
              private router: Router) { }

  ngOnInit(): void {
    (async () => {
      this.user = await this.authService.getAuthUser();
      const userTypeRules = await this.dataBaseService.getUserTypeRules();
      const rule = userTypeRules.find(val => val.userTypeId === this.user.typeId && val.ruleId === 1);
      if (rule) {
        this.isAdmin = true;
      } else {
        this.router.navigate(['']);
      }
    })();
  }

}
