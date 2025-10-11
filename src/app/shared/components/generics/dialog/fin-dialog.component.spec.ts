import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinDialogComponent } from './fin-dialog.component';

describe('DialogComponent', () => {
  let component: FinDialogComponent;
  let fixture: ComponentFixture<FinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
