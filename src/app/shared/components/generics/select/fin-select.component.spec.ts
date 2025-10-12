import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSelectComponent } from './fin-select.component';

describe('SelectComponent', () => {
  let component: FinSelectComponent;
  let fixture: ComponentFixture<FinSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
