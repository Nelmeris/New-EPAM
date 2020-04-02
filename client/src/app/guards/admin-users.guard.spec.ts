import { TestBed } from '@angular/core/testing';

import { AdminUsersGuard } from './admin-users.guard';

describe('AdminUsersGuard', () => {
  let guard: AdminUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
