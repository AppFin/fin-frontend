import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fin-credit-charges',
  imports: [RouterModule],
  templateUrl: './credit-charges.component.html',
  styleUrl: './credit-charges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditChargesComponent {}
