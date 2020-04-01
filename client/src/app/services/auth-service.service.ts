import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authStorageKey = 'user_auth_id';

  constructor() { }
  isAuth() {
    return window.localStorage.getItem(this.authStorageKey) != null;
  }
  setAuth(user: User) {
    window.localStorage.setItem(this.authStorageKey, user.id.toString());
  }
}
