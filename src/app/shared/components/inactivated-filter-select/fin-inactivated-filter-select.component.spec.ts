import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinInactivatedFilterSelectComponent } from './fin-inactivated-filter-select.component';

describe('TitleCategoryInactivatedFilterSelectorComponent', () => {
  let component: FinInactivatedFilterSelectComponent;
  let fixture: ComponentFixture<FinInactivatedFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinInactivatedFilterSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinInactivatedFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
