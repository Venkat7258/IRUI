import { TestBed } from '@angular/core/testing';

import { RecentUpdatesServiceService } from './recent-updates-service.service';

describe('RecentUpdatesServiceService', () => {
  let service: RecentUpdatesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentUpdatesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
