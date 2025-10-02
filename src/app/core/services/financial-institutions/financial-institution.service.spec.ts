import { TestBed } from '@angular/core/testing';
import { FinancialInstitutionService } from './financial-institution.service';

describe('FinancialInstitutionService', () => {
  let service: FinancialInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
