import { TestBed } from '@angular/core/testing';

import { AccountPanelGuard } from './account-panel.guard';

describe('AccountPanelGuard', () => {
  let guard: AccountPanelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountPanelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
