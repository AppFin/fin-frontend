import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditChargesEditorComponent } from './credit-charges-editor.component';

describe('CreditChargesEditorComponent', () => {
  let component: CreditChargesEditorComponent;
  let fixture: ComponentFixture<CreditChargesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditChargesEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditChargesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
