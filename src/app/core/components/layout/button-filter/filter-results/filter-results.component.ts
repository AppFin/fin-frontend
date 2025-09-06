import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';

@Component({
  selector: 'fin-filter-results',
  imports: [FinIconComponent, FinTextComponent],
  templateUrl: './filter-results.component.html',
  styleUrl: './filter-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterResultsComponent {}
