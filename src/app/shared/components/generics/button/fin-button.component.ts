import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Button, ButtonLabel } from 'primeng/button';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import {
  FinFontAwesomeType,
  FinIconComponent,
  FinIconSize,
  FinIconType,
} from '../icon/fin-icon.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FinSeverity } from '../../../../core/types/themes/fin-severity';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

export type FinButtonVariant = 'text' | 'outlined' | undefined;

type BadgeSeverity =
  | null
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'danger';

@Component({
  selector: 'fin-button',
  imports: [
    Button,
    FinTranslatePipe,
    ButtonLabel,
    FinIconComponent,
    MatProgressSpinnerModule,
    OverlayBadgeModule,
  ],
  templateUrl: './fin-button.component.html',
  styleUrl: './fin-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinButtonComponent {
  public readonly onClick = output<MouseEvent>();

  public readonly text = input<string | null>(null);
  public readonly disabled = input(false);
  public readonly severity = input<FinSeverity>('primary');
  public readonly variant = input<FinButtonVariant>(undefined);
  public readonly spinner = input<boolean | undefined>(undefined);

  // icon
  public readonly icon = input<string>('');
  public readonly iconColor = input<string | undefined>(undefined);
  public readonly iconFontAwesomeType = input<FinFontAwesomeType>('fa-solid');
  public readonly iconType = input<FinIconType>('fontAwesome');
  public readonly iconImageFolder = input<string>('icons/');
  public readonly iconImageExtension = input<string>('.png');
  public readonly iconTooltip = input<string>('');
  public readonly iconSize = input<FinIconSize>('md');

  // icon suffix
  public readonly iconSuffix = input<string>('');
  public readonly iconSuffixColor = input<string | undefined>(undefined);
  public readonly iconSuffixFontAwesomeType =
    input<FinFontAwesomeType>('fa-solid');
  public readonly iconSuffixType = input<FinIconType>('fontAwesome');
  public readonly iconSuffixImageFolder = input<string>('icons/');
  public readonly iconSuffixImageExtension = input<string>('.png');
  public readonly iconSuffixSize = input<FinIconSize>('md');

  public readonly iconBadge = input<string | null>(null);
  public readonly iconBadgeSeverity = input<BadgeSeverity>(null);

  public readonly maybeHasSpin = computed(
    () => this.spinner() !== undefined && this.spinner() !== null
  );
  public readonly isIconOnly = computed(() => this.icon() && !this.text());
  public readonly effectiveText = computed(() =>
    this.isIconOnly() ? '' : (this.text() ?? 'no text')
  );
}
