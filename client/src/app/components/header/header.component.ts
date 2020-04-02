import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User = null;
  title = 'New EPAM';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    (async () => {
      this.user = await this.authService.getAuthUser();
    })();
  }
}
