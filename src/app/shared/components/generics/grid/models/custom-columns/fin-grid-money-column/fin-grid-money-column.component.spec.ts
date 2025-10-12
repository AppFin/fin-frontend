import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinGridMoneyColumnComponent } from './fin-grid-money-column.component';

describe('MoneyColumnComponent', () => {
  let component: FinGridMoneyColumnComponent;
  let fixture: ComponentFixture<FinGridMoneyColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinGridMoneyColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinGridMoneyColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
