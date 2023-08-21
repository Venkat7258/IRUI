import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

import { RecentUpdatesService } from './recent-updates.service';

describe('RecentUpdatesService', () => {
  let service: RecentUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ],
      providers: [IreadyApiService]
    });
    service = TestBed.inject(RecentUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
