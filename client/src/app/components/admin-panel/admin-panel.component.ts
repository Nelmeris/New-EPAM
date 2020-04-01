import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  isAuth = this.authService.isAuth();
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    (async () => {
      this.user = await this.authService.getAuthUser();
    })();
  }

}
