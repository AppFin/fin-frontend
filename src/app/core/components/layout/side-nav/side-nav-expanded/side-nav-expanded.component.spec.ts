import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavExpandedComponent } from './side-nav-expanded.component';

describe('SideNavExpandedComponent', () => {
  let component: SideNavExpandedComponent;
  let fixture: ComponentFixture<SideNavExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavExpandedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
