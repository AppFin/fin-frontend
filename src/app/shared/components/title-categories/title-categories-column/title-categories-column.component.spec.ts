import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoriesColumnComponent } from './title-categories-column.component';

describe('TitleCategoriesColumnComponent', () => {
  let component: TitleCategoriesColumnComponent;
  let fixture: ComponentFixture<TitleCategoriesColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoriesColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoriesColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
