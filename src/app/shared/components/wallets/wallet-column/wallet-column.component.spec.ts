import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletColumnComponent } from './wallet-column.component';

describe('WalletColumnComponent', () => {
  let component: WalletColumnComponent<any>;
  let fixture: ComponentFixture<WalletColumnComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletColumnComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WalletColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
