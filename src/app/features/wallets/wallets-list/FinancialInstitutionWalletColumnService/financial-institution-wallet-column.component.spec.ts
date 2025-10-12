import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInstitutionWalletColumnComponent } from './financial-institution-wallet-column.component';

describe('FinancialInstitutionWalletColumnComponent', () => {
  let component: FinancialInstitutionWalletColumnComponent;
  let fixture: ComponentFixture<FinancialInstitutionWalletColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInstitutionWalletColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialInstitutionWalletColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
