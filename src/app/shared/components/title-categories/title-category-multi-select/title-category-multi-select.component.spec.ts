import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoryMultiSelectComponent } from './title-category-multi-select.component';

describe('TitleCategoryMultiSelectComponent', () => {
  let component: TitleCategoryMultiSelectComponent;
  let fixture: ComponentFixture<TitleCategoryMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoryMultiSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoryMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
