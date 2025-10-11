import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinGridColumnRendererComponent } from './fin-grid-column-renderer.component';

describe('FinGridColumnRendererComponent', () => {
  let component: FinGridColumnRendererComponent;
  let fixture: ComponentFixture<FinGridColumnRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinGridColumnRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinGridColumnRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
