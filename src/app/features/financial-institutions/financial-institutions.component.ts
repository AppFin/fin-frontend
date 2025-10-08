import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fin-financial-institutions',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './financial-institutions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialInstitutionsComponent {}
