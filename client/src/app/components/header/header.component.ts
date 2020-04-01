import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: User = null;
  constructor(private authService: AuthService) {
    this.loadData();
  }
  async loadData() {
    this.user = await this.authService.getAuthUser();
  }
}
