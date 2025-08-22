import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCreatePersonalStepComponent } from './auth-create-personal-step.component';

describe('AuthCreatePersonalStepComponent', () => {
  let component: AuthCreatePersonalStepComponent;
  let fixture: ComponentFixture<AuthCreatePersonalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCreatePersonalStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCreatePersonalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
