import { TestBed } from '@angular/core/testing';

import { AdminPanelGuard } from './admin-panel.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminPanelGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const guard: AdminPanelGuard = TestBed.get(AdminPanelGuard);
    expect(guard).toBeTruthy();
  });
});
