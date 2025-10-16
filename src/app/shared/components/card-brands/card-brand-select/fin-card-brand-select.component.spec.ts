import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBrandSelectComponent } from './card-brand-select.component';

describe('CardBrandSelectComponent', () => {
  let component: CardBrandSelectComponent;
  let fixture: ComponentFixture<CardBrandSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBrandSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBrandSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
