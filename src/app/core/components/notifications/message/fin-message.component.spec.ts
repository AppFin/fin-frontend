import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinMessageComponent } from './fin-message.component';

describe('MessageComponent', () => {
  let component: FinMessageComponent;
  let fixture: ComponentFixture<FinMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
