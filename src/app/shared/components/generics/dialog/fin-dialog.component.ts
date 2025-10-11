import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { FinButtonComponent } from '../button/fin-button.component';
import { FinFontAwesomeType, FinIconComponent, FinIconSize, FinIconType, } from '../icon/fin-icon.component';
import { FinTextComponent } from '../text/fin-text.component';
import { FinSeverity } from '../../../../core/types/themes/fin-severity';
import { getSeverityColor } from '../../../functions/get-severity-color';

@Component({
  selector: 'fin-dialog',
  imports: [FinButtonComponent, FinIconComponent, FinTextComponent],
  templateUrl: './fin-dialog.component.html',
  styleUrl: './fin-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FinDialogComponent {
  public readonly title = input<string>('');
  public readonly severity = input<FinSeverity | null>(null);

  public readonly onClose = input<((ev: MouseEvent) => void) | null>(null);

  // icon
  public readonly icon = input<string|null>(null);
  public readonly iconColor = input<string | undefined>(undefined);
  public readonly iconFontAwesomeType = input<FinFontAwesomeType>('fa-solid');
  public readonly iconType = input<FinIconType>('fontAwesome');
  public readonly iconImageFolder = input<string>('icons/');
  public readonly iconImageExtension = input<string>('.png');
  public readonly iconTooltip = input<string>('');
  public readonly iconSize = input<FinIconSize>('md');

  public readonly canClose = computed(() => !!this.onClose());
  public readonly color = computed(() => getSeverityColor(this.severity()));

  public close(ev: MouseEvent): void {
    if (!this.canClose()) return;
    this.onClose()?.(ev);
  }
}
