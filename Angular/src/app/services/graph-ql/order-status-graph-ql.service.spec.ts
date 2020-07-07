import { TestBed } from '@angular/core/testing';

import { OrderStatusGraphQLService } from './order-status-graph-ql.service';

describe('OrderStatusGraphQLService', () => {
  let service: OrderStatusGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStatusGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
