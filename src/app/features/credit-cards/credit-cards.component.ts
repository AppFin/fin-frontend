import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'fin-credit-cards',
  imports: [RouterModule],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardsComponent {

}
