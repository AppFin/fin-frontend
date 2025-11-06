import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'fin-titles',
  imports: [RouterModule],
  templateUrl: './titles.component.html',
  styleUrl: './titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitlesComponent {

}
