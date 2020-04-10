import { TestBed } from '@angular/core/testing';

import { AdminUsersGuard } from './admin-users.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminUsersGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const guard: AdminUsersGuard = TestBed.get(AdminUsersGuard);
    expect(guard).toBeTruthy();
  });
});
