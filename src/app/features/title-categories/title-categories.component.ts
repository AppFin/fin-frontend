import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fin-title-categories',
  imports: [RouterOutlet],
  templateUrl: './title-categories.component.html',
  styleUrl: './title-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCategoriesComponent {}
