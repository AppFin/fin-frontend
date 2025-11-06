import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleListFilterComponent } from './title-list-filter.component';

describe('TitleListFilterComponent', () => {
  let component: TitleListFilterComponent;
  let fixture: ComponentFixture<TitleListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleListFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
