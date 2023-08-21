import { TestBed } from '@angular/core/testing';

import { IngDetailsService } from './ing-details.service';

describe('IngDetailsService', () => {
  let service: IngDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
