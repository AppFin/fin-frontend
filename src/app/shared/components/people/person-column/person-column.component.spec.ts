import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonColumnComponent } from './person-column.component';

describe('PersonColumnComponent', () => {
  let component: PersonColumnComponent;
  let fixture: ComponentFixture<PersonColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
