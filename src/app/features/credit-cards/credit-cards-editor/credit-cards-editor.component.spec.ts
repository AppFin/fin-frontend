import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardsEditorComponent } from './credit-cards-editor.component';

describe('CreditCardsEditorComponent', () => {
  let component: CreditCardsEditorComponent;
  let fixture: ComponentFixture<CreditCardsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
