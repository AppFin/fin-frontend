import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fin-wallets',
  imports: [RouterOutlet],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent {}
