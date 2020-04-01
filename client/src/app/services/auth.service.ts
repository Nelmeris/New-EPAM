import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {DataBaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStorageKey = 'user_auth_id';

  constructor(private dataBaseService: DataBaseService) { }
  isAuth(): boolean {
    return window.localStorage.getItem(this.authStorageKey) != null;
  }
  setAuth(user: User) {
    window.localStorage.setItem(this.authStorageKey, user.id.toString());
  }
  async getAuthUser(): Promise<User> {
    const userId = window.localStorage.getItem(this.authStorageKey);
    return await this.dataBaseService.getUserById(+userId);
  }
}
