import { TestBed } from '@angular/core/testing';

import { OrderTypeGraphQLService } from './order-type-graph-ql.service';

describe('OrderTypeGraphQLService', () => {
  let service: OrderTypeGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderTypeGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
