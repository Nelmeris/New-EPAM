import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {User} from "../../models/user/user";

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('user should be auth', () => {
    const service: AuthService = TestBed.get(AuthService);
    const user: User = new User(null);
    user.id = 0;
    service.setAuth(user);
    expect(service.isAuth).toBeTruthy();
  });

  it('user should be logout', () => {
    const service: AuthService = TestBed.get(AuthService);
    const user: User = new User(null);
    user.id = 0;
    service.setAuth(user);
    service.logout();
    expect(!service.isAuth).toBeFalse();
  });
});
