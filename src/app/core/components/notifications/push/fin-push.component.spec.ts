import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPushComponent } from './fin-push.component';

describe('SnackComponent', () => {
  let component: FinPushComponent;
  let fixture: ComponentFixture<FinPushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinPushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
