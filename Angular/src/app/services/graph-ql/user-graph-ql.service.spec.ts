import { TestBed } from '@angular/core/testing';

import { UserGraphQLService } from './user-graph-ql.service';

describe('UserGraphQLService', () => {
  let service: UserGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
