import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNotificationItemComponent } from './side-notification-item.component';

describe('SideNotificationItemComponent', () => {
  let component: SideNotificationItemComponent;
  let fixture: ComponentFixture<SideNotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNotificationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
