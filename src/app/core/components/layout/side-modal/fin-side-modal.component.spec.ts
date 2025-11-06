import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSideModalComponent } from './fin-side-modal.component';

describe('FinSideModalComponent', () => {
  let component: FinSideModalComponent;
  let fixture: ComponentFixture<FinSideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinSideModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinSideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
