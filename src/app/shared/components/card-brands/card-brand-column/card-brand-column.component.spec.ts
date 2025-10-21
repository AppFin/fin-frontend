import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBrandColumnComponent } from './card-brand-column.component';

describe('CardBrandColumnComponent', () => {
  let component: CardBrandColumnComponent<any>;
  let fixture: ComponentFixture<CardBrandColumnComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBrandColumnComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardBrandColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
