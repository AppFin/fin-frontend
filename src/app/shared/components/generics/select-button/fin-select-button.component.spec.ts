import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSelectButtonComponent } from './fin-select-button.component';

describe('FinSelectButtonComponent', () => {
  let component: FinSelectButtonComponent;
  let fixture: ComponentFixture<FinSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinSelectButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
