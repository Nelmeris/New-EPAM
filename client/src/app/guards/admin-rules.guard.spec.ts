import { TestBed } from '@angular/core/testing';

import { AdminRulesGuard } from './admin-rules.guard';

describe('AdminRulesGuard', () => {
  let guard: AdminRulesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRulesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
