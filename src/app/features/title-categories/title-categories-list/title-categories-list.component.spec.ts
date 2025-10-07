import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoriesListComponent } from './title-categories-list.component';

describe('TitleCategoriesListComponent', () => {
  let component: TitleCategoriesListComponent;
  let fixture: ComponentFixture<TitleCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoriesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
