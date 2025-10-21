import { TestBed } from '@angular/core/testing';

import { CreditCardApiService } from './credit-card-api.service';

describe('WalletApiService', () => {
  let service: CreditCardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
