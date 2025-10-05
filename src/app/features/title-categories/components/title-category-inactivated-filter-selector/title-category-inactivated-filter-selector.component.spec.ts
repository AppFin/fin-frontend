import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoryInactivatedFilterSelectorComponent } from './title-category-inactivated-filter-selector.component';

describe('TitleCategoryInactivatedFilterSelectorComponent', () => {
  let component: TitleCategoryInactivatedFilterSelectorComponent;
  let fixture: ComponentFixture<TitleCategoryInactivatedFilterSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoryInactivatedFilterSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoryInactivatedFilterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
