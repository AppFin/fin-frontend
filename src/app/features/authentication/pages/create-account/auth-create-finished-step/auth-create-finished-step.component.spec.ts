import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCreateFinishedStepComponent } from './auth-create-finished-step.component';

describe('AuthCreateFinishedStepComponent', () => {
  let component: AuthCreateFinishedStepComponent;
  let fixture: ComponentFixture<AuthCreateFinishedStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCreateFinishedStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCreateFinishedStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
