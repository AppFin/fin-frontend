import { TestBed } from '@angular/core/testing';

import { TitleApiService } from './title-api.service';

describe('TitleApiService', () => {
  let service: TitleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
