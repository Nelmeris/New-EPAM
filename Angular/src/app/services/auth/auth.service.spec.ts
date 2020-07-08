import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../../models/user/user";
import { UserGraphQLService } from '../graph-ql/user-graph-ql.service';
import { Apollo } from 'apollo-angular-boost';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ],
    providers: [ UserGraphQLService, Apollo ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('user should be auth', () => {
    const service: AuthService = TestBed.get(AuthService);
    const user: User = new User();
    user.id = '';
    service.setAuth(user);
    expect(service.isAuth).toBeTruthy();
  });

  it('user should be logout', () => {
    const service: AuthService = TestBed.get(AuthService);
    const user: User = new User();
    user.id = '';
    service.setAuth(user);
    service.logout();
    expect(!service.isAuth).toBeFalse();
  });
});