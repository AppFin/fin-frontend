import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditChargesComponent } from './credit-charges.component';

describe('CreditChargesComponent', () => {
  let component: CreditChargesComponent;
  let fixture: ComponentFixture<CreditChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditChargesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
