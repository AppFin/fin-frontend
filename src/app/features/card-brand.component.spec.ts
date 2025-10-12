import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBrandComponent } from './card-brand.component';

describe('CardBrandComponent', () => {
  let component: CardBrandComponent;
  let fixture: ComponentFixture<CardBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
