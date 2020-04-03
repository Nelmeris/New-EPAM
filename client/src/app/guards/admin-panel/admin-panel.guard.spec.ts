import { TestBed } from '@angular/core/testing';

import { AdminPanelGuard } from './admin-panel.guard';

describe('AdminPanelGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: AdminPanelGuard = TestBed.get(AdminPanelGuard);
    expect(guard).toBeTruthy();
  });
});
