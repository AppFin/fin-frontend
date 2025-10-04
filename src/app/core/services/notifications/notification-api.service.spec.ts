import { TestBed } from '@angular/core/testing';

import { NotificationApiService } from './notification-api.service';

describe('NotificationApiService', () => {
  let service: NotificationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
