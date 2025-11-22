import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMultiSelectComponent } from './person-multi-select.component';

describe('PersonMultiSelectComponent', () => {
  let component: PersonMultiSelectComponent;
  let fixture: ComponentFixture<PersonMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonMultiSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
