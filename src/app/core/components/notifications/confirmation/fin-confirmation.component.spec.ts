import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinConfirmationComponent } from './fin-confirmation.component';

describe('ConfirmationComponent', () => {
  let component: FinConfirmationComponent;
  let fixture: ComponentFixture<FinConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
