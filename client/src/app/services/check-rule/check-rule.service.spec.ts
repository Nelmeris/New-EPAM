import { TestBed } from '@angular/core/testing';

import { CheckRuleService } from './check-rule.service';

describe('CheckRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckRuleService = TestBed.get(CheckRuleService);
    expect(service).toBeTruthy();
  });
});
