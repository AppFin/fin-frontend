import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinMoneyInputComponent } from './fin-money-input.component';

describe('MoneyInputComponent', () => {
  let component: FinMoneyInputComponent;
  let fixture: ComponentFixture<FinMoneyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinMoneyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinMoneyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
