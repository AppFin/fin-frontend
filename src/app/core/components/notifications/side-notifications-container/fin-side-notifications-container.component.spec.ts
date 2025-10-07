import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSideNotificationsContainerComponent } from './fin-side-notifications-container.component';

describe('SideNotificationsContainerComponent', () => {
  let component: FinSideNotificationsContainerComponent;
  let fixture: ComponentFixture<FinSideNotificationsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinSideNotificationsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinSideNotificationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
