import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinMonthDaySelectComponent } from './fin-month-day-select.component';

describe('MonthDayFilterSelectorComponent', () => {
  let component: FinMonthDaySelectComponent;
  let fixture: ComponentFixture<FinMonthDaySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinMonthDaySelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinMonthDaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
