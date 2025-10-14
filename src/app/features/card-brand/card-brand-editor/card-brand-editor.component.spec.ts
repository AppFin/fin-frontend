import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBrandEditorComponent } from './card-brand-editor.component';

describe('CardBrandEditorComponent', () => {
  let component: CardBrandEditorComponent;
  let fixture: ComponentFixture<CardBrandEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBrandEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBrandEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
