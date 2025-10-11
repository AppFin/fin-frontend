import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinGridActionsRendererComponent } from './fin-grid-actions-renderer.component';

describe('FinGridActionsRendererComponent', () => {
  let component: FinGridActionsRendererComponent;
  let fixture: ComponentFixture<FinGridActionsRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinGridActionsRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinGridActionsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
