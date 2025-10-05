import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoryTypeSelectorComponent } from './title-category-type-selector.component';

describe('TitleCategoryTypeSelectorComponent', () => {
  let component: TitleCategoryTypeSelectorComponent;
  let fixture: ComponentFixture<TitleCategoryTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoryTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoryTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
