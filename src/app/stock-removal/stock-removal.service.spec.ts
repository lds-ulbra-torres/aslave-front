import { TestBed } from '@angular/core/testing';

import { StockRemovalService } from './stock-removal.service';

describe('StockRemovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockRemovalService = TestBed.get(StockRemovalService);
    expect(service).toBeTruthy();
  });
});
