import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditChargesListComponent } from './credit-charges-list.component';

describe('CreditChargesListComponent', () => {
  let component: CreditChargesListComponent;
  let fixture: ComponentFixture<CreditChargesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditChargesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditChargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
