import { TestBed } from '@angular/core/testing';

import { AdminOrdersGuard } from './admin-orders.guard';

describe('AdminOrdersGuard', () => {
  let guard: AdminOrdersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOrdersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
