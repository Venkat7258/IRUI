import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

import { IngredientsRegulationsService } from './ingredients-regulations.service';

describe('IngredientsRegulationsService', () => {
  let service: IngredientsRegulationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule],
      providers: [IreadyApiService],
    });
    service = TestBed.inject(IngredientsRegulationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
