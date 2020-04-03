import { TestBed } from '@angular/core/testing';

import { AdminRulesGuard } from './admin-rules.guard';

describe('AdminRulesGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: AdminRulesGuard = TestBed.get(AdminRulesGuard);
    expect(guard).toBeTruthy();
  });
});
