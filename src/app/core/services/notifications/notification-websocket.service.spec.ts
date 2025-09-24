import { TestBed } from '@angular/core/testing';

import { NotificationWebsocketService } from './notification-websocket.service';

describe('NotificationWebsocketService', () => {
  let service: NotificationWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
