import { TestBed } from '@angular/core/testing';

import { FinTranslateService } from './fin-translate.service';

describe('FinTranslateService', () => {
  let service: FinTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
