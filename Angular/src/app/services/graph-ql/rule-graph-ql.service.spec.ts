import { TestBed } from '@angular/core/testing';

import { RuleGraphQLService } from './rule-graph-ql.service';

describe('RuleGraphQLService', () => {
  let service: RuleGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
