import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoriesEditorComponent } from './title-categories-editor.component';

describe('TitleCategoriesEditorComponent', () => {
  let component: TitleCategoriesEditorComponent;
  let fixture: ComponentFixture<TitleCategoriesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoriesEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
