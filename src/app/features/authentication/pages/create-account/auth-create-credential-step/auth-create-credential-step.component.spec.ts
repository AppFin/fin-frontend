import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCreateCredentialStepComponent } from './auth-create-credential-step.component';

describe('AuthCreateCredentialStepComponent', () => {
  let component: AuthCreateCredentialStepComponent;
  let fixture: ComponentFixture<AuthCreateCredentialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCreateCredentialStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCreateCredentialStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
