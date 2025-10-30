import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideModalLayoutComponent } from './side-modal-layout.component';

describe('SideModalLayoutComponent', () => {
  let component: SideModalLayoutComponent;
  let fixture: ComponentFixture<SideModalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideModalLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideModalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
