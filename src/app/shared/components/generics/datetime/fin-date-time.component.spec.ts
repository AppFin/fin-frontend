import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinDateTimeComponent } from './fin-date-time.component';

describe('DatetimeComponent', () => {
  let component: FinDateTimeComponent;
  let fixture: ComponentFixture<FinDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinDateTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
