import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinTextareaComponent } from './fin-textarea.component';

describe('TextareaComponent', () => {
  let component: FinTextareaComponent;
  let fixture: ComponentFixture<FinTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
