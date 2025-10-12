import { TestBed } from '@angular/core/testing';

import { WalletApiService } from './wallet-api.service';

describe('WalletApiService', () => {
  let service: WalletApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
