import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const guard: LoginGuard = TestBed.get(LoginGuard);
    expect(guard).toBeTruthy();
  });
});
