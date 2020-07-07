import { TestBed } from '@angular/core/testing';

import { UserTypeRuleGraphQLService } from './user-type-rule-graph-ql.service';

describe('UserTypeRuleGraphQLService', () => {
  let service: UserTypeRuleGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeRuleGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
