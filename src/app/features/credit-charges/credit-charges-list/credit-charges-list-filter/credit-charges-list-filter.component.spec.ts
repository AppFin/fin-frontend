import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditChargeListFilterComponent } from './credit-charges-list-filter.component';

describe('CreditChargeListFilterComponent', () => {
  let component: CreditChargeListFilterComponent;
  let fixture: ComponentFixture<CreditChargeListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditChargeListFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditChargeListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
