import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialInstitutionsComponent } from './financial-institutions.component';

describe('FinancialInstitutionsComponent', () => {
  let component: FinancialInstitutionsComponent;
  let fixture: ComponentFixture<FinancialInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInstitutionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
