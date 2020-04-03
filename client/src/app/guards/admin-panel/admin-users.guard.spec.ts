import { TestBed } from '@angular/core/testing';

import { AdminUsersGuard } from './admin-users.guard';

describe('AdminUsersGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: AdminUsersGuard = TestBed.get(AdminUsersGuard);
    expect(guard).toBeTruthy();
  });
});
