import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinTextComponent } from './fin-text.component';

describe('TextComponent', () => {
  let component: FinTextComponent;
  let fixture: ComponentFixture<FinTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
