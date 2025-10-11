import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinButtonComponent } from './fin-button.component';

describe('FinButtonComponent', () => {
  let component: FinButtonComponent;
  let fixture: ComponentFixture<FinButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
