import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoryTypeSelectComponent } from './title-category-type-select.component';

describe('TitleCategoryTypeSelectorComponent', () => {
  let component: TitleCategoryTypeSelectComponent;
  let fixture: ComponentFixture<TitleCategoryTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoryTypeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoryTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
