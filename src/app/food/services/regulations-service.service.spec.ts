import { TestBed } from '@angular/core/testing';

import { RegulationsServiceService } from './regulations-service.service';

describe('RegulationsServiceService', () => {
  let service: RegulationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegulationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
