import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { UserGraphQLService } from '../graph-ql/user-graph-ql.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStorageKey = 'user_auth_id';
  isLogout = false;

  constructor(
    private userGraphQLService: UserGraphQLService
  ) {
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
    const user = await this.userGraphQLService.getUser(userId);
    if (!user) {
      this.logout();
      return null;
    } else
      return user;
  }

}
