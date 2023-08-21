/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { FormulaComplianceService } from './formula-compliance.service';

describe('Service: FormulaCompliance', () => {
  let service: FormulaComplianceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ],
      providers: [FormulaComplianceService]
    });
    service = TestBed.inject(FormulaComplianceService);
  });

  it('should ...', inject([FormulaComplianceService], (service: FormulaComplianceService) => {
    expect(service).toBeTruthy();
  }));
});
