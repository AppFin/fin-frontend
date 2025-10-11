import { TestBed } from '@angular/core/testing';

import { FinancialInstitutionWalletColumnService } from './financial-institution-wallet-column.service';

describe('FinancialInstitutionWalletColumnService', () => {
  let service: FinancialInstitutionWalletColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialInstitutionWalletColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
