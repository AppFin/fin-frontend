import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusEditorComponent } from './menus-editor.component';

describe('MenusEditorComponent', () => {
  let component: MenusEditorComponent;
  let fixture: ComponentFixture<MenusEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
