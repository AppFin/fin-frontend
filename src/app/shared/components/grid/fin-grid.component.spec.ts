import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinGridComponent } from './fin-grid.component';

describe('GridComponent', () => {
  let component: FinGridComponent;
  let fixture: ComponentFixture<FinGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
