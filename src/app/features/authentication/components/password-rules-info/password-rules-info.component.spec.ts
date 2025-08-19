import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRulesInfoComponent } from './password-rules-info.component';

describe('PasswordRulesInfoComponent', () => {
  let component: PasswordRulesInfoComponent;
  let fixture: ComponentFixture<PasswordRulesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRulesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRulesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
