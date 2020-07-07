import { TestBed } from '@angular/core/testing';

import { UserTypeGraphQLService } from './user-type-graph-ql.service';

describe('UserTypeGraphQLService', () => {
  let service: UserTypeGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
