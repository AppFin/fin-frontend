import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinMultiplyFilterOperatorFilterSelectComponent } from './fin-multiply-filter-operator-filter-select.component';

describe('FinMultiplyFilterOperatorFilterSelectComponent', () => {
  let component: FinMultiplyFilterOperatorFilterSelectComponent;
  let fixture: ComponentFixture<FinMultiplyFilterOperatorFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinMultiplyFilterOperatorFilterSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinMultiplyFilterOperatorFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
