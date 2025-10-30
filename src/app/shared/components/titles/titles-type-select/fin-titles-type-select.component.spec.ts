import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinTitlesTypeSelectComponent } from './fin-titles-type-select.component';

describe('FinTitlesTypeSelectComponent', () => {
  let component: FinTitlesTypeSelectComponent;
  let fixture: ComponentFixture<FinTitlesTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinTitlesTypeSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinTitlesTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
