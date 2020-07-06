import { TestBed } from '@angular/core/testing';

import { CheckRuleService } from './check-rule.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CheckRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: CheckRuleService = TestBed.get(CheckRuleService);
    expect(service).toBeTruthy();
  });
});
