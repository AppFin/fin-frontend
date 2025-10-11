import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPageLayoutComponent } from './fin-page-layout.component';

describe('PageLayoutComponent', () => {
  let component: FinPageLayoutComponent;
  let fixture: ComponentFixture<FinPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinPageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
