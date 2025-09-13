import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { LayoutService } from '../../../core/services/layout/layout.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'fin-page-layout',
  imports: [MatProgressSpinnerModule],
  templateUrl: './fin-page-layout.component.html',
  styleUrl: './fin-page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FinPageLayoutComponent {
  public readonly title = input<string>();
  public readonly loading = input(false);

  private readonly layoutService = inject(LayoutService);

  private readonly titleEffect = effect(() => {
    const title = this.title();
    if (title) this.layoutService.setPageName(title);
  });
}
