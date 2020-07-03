import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStorageKey = 'user_auth_id';
  isLogout = false;

  constructor(private dataBaseService: DataBaseService) {
    this.isLogout = window.localStorage.getItem(this.authStorageKey) === null;
  }

  isAuth(): boolean {
    return !this.isLogout;
  }

  setAuth(user: User) {
    window.localStorage.setItem(this.authStorageKey, user.id.toString());
    this.isLogout = false;
  }

  logout() {
    window.localStorage.removeItem(this.authStorageKey);
    this.isLogout = true;
  }

  async getAuthUser(): Promise<User> {
    const userId = window.localStorage.getItem(this.authStorageKey);
    return await this.dataBaseService.getUserById(userId);
  }

}
