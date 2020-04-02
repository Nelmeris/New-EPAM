import { TestBed } from '@angular/core/testing';

import { CheckRuleService } from './check-rule.service';

describe('CheckRuleService', () => {
  let service: CheckRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
