import { TestBed } from '@angular/core/testing';

import { AdminOrdersGuard } from './admin-orders.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminOrdersGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const guard: AdminOrdersGuard = TestBed.get(AdminOrdersGuard);
    expect(guard).toBeTruthy();
  });
});
