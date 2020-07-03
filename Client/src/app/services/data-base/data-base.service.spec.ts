import { TestBed } from '@angular/core/testing';

import { DataBaseService } from './data-base.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: DataBaseService = TestBed.get(DataBaseService);
    expect(service).toBeTruthy();
  });
});
