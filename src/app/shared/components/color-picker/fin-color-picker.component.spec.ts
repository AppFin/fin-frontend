import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinColorPickerComponent } from './fin-color-picker.component';

describe('ColorPickerComponent', () => {
  let component: FinColorPickerComponent;
  let fixture: ComponentFixture<FinColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinColorPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
