import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSideNotificationTogglerComponent } from './fin-side-notification-toggler.component';

describe('SideNotificationTogglerComponent', () => {
  let component: FinSideNotificationTogglerComponent;
  let fixture: ComponentFixture<FinSideNotificationTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinSideNotificationTogglerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinSideNotificationTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
