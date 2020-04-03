import { TestBed } from '@angular/core/testing';

import { AdminOrdersGuard } from './admin-orders.guard';

describe('AdminOrdersGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: AdminOrdersGuard = TestBed.get(AdminOrdersGuard);
    expect(guard).toBeTruthy();
  });
});
