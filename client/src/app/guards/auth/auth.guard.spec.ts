import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: AuthGuard = TestBed.get(AuthGuard);
    expect(guard).toBeTruthy();
  });
});
