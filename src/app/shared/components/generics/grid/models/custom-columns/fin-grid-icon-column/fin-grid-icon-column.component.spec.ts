import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinGridIconColumnComponent } from './fin-grid-icon-column.component';

describe('FinGridIconColumnComponent', () => {
  let component: FinGridIconColumnComponent;
  let fixture: ComponentFixture<FinGridIconColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinGridIconColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinGridIconColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
