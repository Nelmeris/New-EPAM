import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User = null;
  title = 'New EPAM';
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private canActivateGuard: AuthGuard) {
    this.loadData();
  }
  async loadData() {
    this.user = await this.authService.getAuthUser();
  }

}
