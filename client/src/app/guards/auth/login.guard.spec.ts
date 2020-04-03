import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: LoginGuard = TestBed.get(LoginGuard);
    expect(guard).toBeTruthy();
  });
});
