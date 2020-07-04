import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const guard: AuthGuard = TestBed.get(AuthGuard);
    expect(guard).toBeTruthy();
  });
});
