import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinEditorComponent } from './fin-editor.component';

describe('EditorComponent', () => {
  let component: FinEditorComponent;
  let fixture: ComponentFixture<FinEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
