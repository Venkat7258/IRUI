import { TestBed } from '@angular/core/testing';

import { IngDetailsServiceService } from './ing-details-service.service';

describe('IngDetailsServiceService', () => {
  let service: IngDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
