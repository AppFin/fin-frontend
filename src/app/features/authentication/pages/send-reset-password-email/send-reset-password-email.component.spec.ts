import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetPasswordEmailComponent } from './send-reset-password-email.component';

describe('SendResetPasswordEmailComponent', () => {
  let component: SendResetPasswordEmailComponent;
  let fixture: ComponentFixture<SendResetPasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendResetPasswordEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendResetPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
