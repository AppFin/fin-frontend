import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinIconComponent } from './fin-icon.component';

describe('IconComponent', () => {
  let component: FinIconComponent;
  let fixture: ComponentFixture<FinIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
