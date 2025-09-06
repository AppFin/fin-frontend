import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterResultsComponent } from './filter-results.component';

describe('FilterResultsComponent', () => {
  let component: FilterResultsComponent;
  let fixture: ComponentFixture<FilterResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
