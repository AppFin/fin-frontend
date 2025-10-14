import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBrandListComponent } from './card-brand-list.component';

describe('CardBrandListComponent', () => {
  let component: CardBrandListComponent;
  let fixture: ComponentFixture<CardBrandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBrandListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
