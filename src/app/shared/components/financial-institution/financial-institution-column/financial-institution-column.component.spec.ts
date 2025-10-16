import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInstitutionColumnComponent } from './financial-institution-column.component';

describe('FinancialInstitutionColumnComponent', () => {
  let component: FinancialInstitutionColumnComponent<any>;
  let fixture: ComponentFixture<FinancialInstitutionColumnComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInstitutionColumnComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinancialInstitutionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
