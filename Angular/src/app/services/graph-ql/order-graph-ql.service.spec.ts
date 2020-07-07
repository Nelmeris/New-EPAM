import { TestBed } from '@angular/core/testing';

import { OrderGraphQLService } from './order-graph-ql.service';

describe('OrderGraphQLService', () => {
  let service: OrderGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
