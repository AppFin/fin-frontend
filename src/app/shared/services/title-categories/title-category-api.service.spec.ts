import { TestBed } from '@angular/core/testing';

import { TitleCategoryApiService } from './title-category-api.service';

describe('TitleCategoryApiService', () => {
  let service: TitleCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
