import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { DataBaseService } from './data-base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStorageKey = 'user_auth_id';

  constructor(private dataBaseService: DataBaseService,
              private router: Router) { }
  isAuth(): boolean {
    return window.localStorage.getItem(this.authStorageKey) != null;
  }
  setAuth(user: User) {
    window.localStorage.setItem(this.authStorageKey, user.id.toString());
  }
  logout() {
    window.localStorage.removeItem(this.authStorageKey);
  }
  async getAuthUser(): Promise<User> {
    const userId = window.localStorage.getItem(this.authStorageKey);
    return await this.dataBaseService.getUserById(+userId);
  }
}
