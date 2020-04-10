import { TestBed } from '@angular/core/testing';

import { AccountPanelGuard } from './account-panel.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountPanelGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const guard: AccountPanelGuard = TestBed.get(AccountPanelGuard);
    expect(guard).toBeTruthy();
  });
});
