import { TestBed } from '@angular/core/testing';

import { AccountPanelGuard } from './account-panel.guard';

describe('AccountPanelGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const guard: AccountPanelGuard = TestBed.get(AccountPanelGuard);
    expect(guard).toBeTruthy();
  });
});
