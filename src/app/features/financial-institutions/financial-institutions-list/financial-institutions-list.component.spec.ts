import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialInstitutionsListComponent } from './financial-institutions-list.component';

describe('FinancialInstitutionsListComponent', () => {
  let component: FinancialInstitutionsListComponent;
  let fixture: ComponentFixture<FinancialInstitutionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInstitutionsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialInstitutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
