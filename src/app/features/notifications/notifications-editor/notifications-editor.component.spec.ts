import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsEditorComponent } from './notifications-editor.component';

describe('NotificationsEditorComponent', () => {
  let component: NotificationsEditorComponent;
  let fixture: ComponentFixture<NotificationsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
