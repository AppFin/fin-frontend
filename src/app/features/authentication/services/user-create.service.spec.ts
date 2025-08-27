import { TestBed } from '@angular/core/testing';

import { UserCreateService } from './user-create.service';

describe('UserCreateService', () => {
  let service: UserCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
