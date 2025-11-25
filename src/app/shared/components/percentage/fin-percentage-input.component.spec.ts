import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPercentageInputComponent } from './fin-percentage-input.component';

describe('PercentageInputComponent', () => {
  let component: FinPercentageInputComponent;
  let fixture: ComponentFixture<FinPercentageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinPercentageInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinPercentageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
