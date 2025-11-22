import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPeopleSelectComponent } from './fin-person-select.component';

describe('FinPersonSelectComponent', () => {
  let component: FinPeopleSelectComponent;
  let fixture: ComponentFixture<FinPeopleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinPeopleSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinPeopleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
