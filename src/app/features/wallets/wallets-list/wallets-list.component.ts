import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import {
  FinInactivatedFilterSelectComponent
} from '../../../shared/components/inactivated-filter-select/fin-inactivated-filter-select.component';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';

@Component({
  selector: 'fin-wallets-list',
  imports: [
    FinButtonComponent,
    FinGridComponent,
    FinInactivatedFilterSelectComponent,
    FinPageLayoutComponent,
  ],
  templateUrl: './wallets-list.component.html',
  styleUrl: './wallets-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsListComponent {}
