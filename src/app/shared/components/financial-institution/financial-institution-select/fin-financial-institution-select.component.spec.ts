import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinFinancialInstitutionSelectComponent } from './fin-financial-institution-select.component';

describe('FinancialInstitutionSelectComponent', () => {
  let component: FinFinancialInstitutionSelectComponent;
  let fixture: ComponentFixture<FinFinancialInstitutionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinFinancialInstitutionSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinFinancialInstitutionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
