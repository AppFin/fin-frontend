import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCreateComponent } from './login-create.component';

describe('LoginCreateComponent', () => {
  let component: LoginCreateComponent;
  let fixture: ComponentFixture<LoginCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
