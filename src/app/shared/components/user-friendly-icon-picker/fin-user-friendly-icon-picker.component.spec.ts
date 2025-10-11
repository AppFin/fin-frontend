import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinUserFriendlyIconPickerComponent } from './fin-user-friendly-icon-picker.component';

describe('FinUserFriendlyIconPickerComponent', () => {
  let component: FinUserFriendlyIconPickerComponent;
  let fixture: ComponentFixture<FinUserFriendlyIconPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinUserFriendlyIconPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinUserFriendlyIconPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
