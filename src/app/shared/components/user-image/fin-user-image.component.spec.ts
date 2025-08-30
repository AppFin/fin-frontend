import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinUserImageComponent } from './fin-user-image.component';

describe('UserImageComponent', () => {
  let component: FinUserImageComponent;
  let fixture: ComponentFixture<FinUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinUserImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
