import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fin-menus',
  imports: [RouterOutlet],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenusComponent {}
