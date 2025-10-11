import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinUserFriendlyColorPickerComponent } from './fin-user-friendly-color-picker.component';

describe('UserFriendlyColorPickerComponent', () => {
  let component: FinUserFriendlyColorPickerComponent;
  let fixture: ComponentFixture<FinUserFriendlyColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinUserFriendlyColorPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinUserFriendlyColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
