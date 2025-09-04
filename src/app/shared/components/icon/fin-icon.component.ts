import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { FinSeverity } from '../../../core/types/themes/fin-severity';
import { finSeverityConverter } from '../../../core/functions/fin-severity-converter';

export type FinIconSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '10xl'
  | '15xl';
export type FinFontAwesomeType =
  | 'fas'
  | 'far'
  | 'fab'
  | 'fal'
  | 'fad'
  | 'fa-brands';
export type FinIconType = 'fontAwesome' | 'image' | 'bank' | 'flag';

@Component({
  selector: 'fin-icon',
  imports: [
    CommonModule,
    MatTooltipModule,
    TranslateModule,
    NgOptimizedImage,
    FinTranslatePipe,
  ],
  templateUrl: './fin-icon.component.html',
  styleUrl: './fin-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinIconComponent {
  public readonly icon = input<string>();
  public readonly fontAwesomeType = input<FinFontAwesomeType>('fas');
  public readonly type = input<FinIconType>('fontAwesome');
  public readonly imageFolder = input<string>('icons/');
  public readonly imageExtension = input<string>('.png');
  public readonly size = input<FinIconSize>('md');
  public readonly customSize = input<number | null>(null);
  public readonly iconColor = input<string | undefined>(undefined);
  public readonly boxColor = input<string>('transparent');
  public readonly boxRadius = input<number>(6);
  public readonly padding = input<number>(4);
  public readonly tooltip = input<string>('');
  public readonly severity = input<FinSeverity | null>(null);
  public readonly imagePath = computed(() => {
    if (!this.icon() || this.type() === 'fontAwesome') return '';

    let folder = this.imageFolder();
    switch (this.type()) {
      case 'bank':
        folder = 'icons/banks/';
        break;
      case 'flag':
        folder = 'icons/flags/';
        break;
    }

    let extension = this.imageExtension();
    if (this.type() !== 'image') extension = '.png';

    return `${folder}${this.icon()}${extension}`;
  });
  private sizeMap: Record<FinIconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '10xl': 120,
    '15xl': 180,
  };
  public readonly iconSize = computed(() => {
    return this.customSize() || this.sizeMap[this.size()];
  });
  public readonly containerSize = computed(() => {
    return this.iconSize() + this.padding() * 2;
  });
  public readonly iconEffectiveColor = computed(() => {
    if (this.iconColor()) return this.iconColor();
    const severity = this.severity();
    if (severity !== null) return finSeverityConverter(severity);
    return '';
  });
}
