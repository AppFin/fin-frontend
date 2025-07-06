import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSaveButtonComponent } from './fin-save-button.component';

describe('SaveButtonComponent', () => {
  let component: FinSaveButtonComponent;
  let fixture: ComponentFixture<FinSaveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinSaveButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinSaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
