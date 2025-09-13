import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusComponent } from './menus.component';

describe('MenuComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
