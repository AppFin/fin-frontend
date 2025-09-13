import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinToggleSwitchComponent } from './fin-toggle-switch.component';

describe('ToggleSwitchComponent', () => {
  let component: FinToggleSwitchComponent;
  let fixture: ComponentFixture<FinToggleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinToggleSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
