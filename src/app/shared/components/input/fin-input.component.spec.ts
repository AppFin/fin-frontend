import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinInputComponent } from './fin-input.component';

describe('InputComponent', () => {
  let component: FinInputComponent;
  let fixture: ComponentFixture<FinInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
