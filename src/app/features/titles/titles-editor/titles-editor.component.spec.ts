import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlesEditorComponent } from './titles-editor.component';

describe('TitlesEditorComponent', () => {
  let component: TitlesEditorComponent;
  let fixture: ComponentFixture<TitlesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitlesEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitlesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
