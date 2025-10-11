import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsEditorComponent } from './wallets-editor.component';

describe('WalletsEditorComponent', () => {
  let component: WalletsEditorComponent;
  let fixture: ComponentFixture<WalletsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
