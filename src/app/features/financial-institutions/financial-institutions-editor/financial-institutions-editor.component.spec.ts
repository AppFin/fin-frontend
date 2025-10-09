import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialInstitutionsEditorComponent } from './financial-institutions-editor.component';

describe('FinancialInstitutionsEditorComponent', () => {
  let component: FinancialInstitutionsEditorComponent;
  let fixture: ComponentFixture<FinancialInstitutionsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInstitutionsEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialInstitutionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
