import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '10xl';
export type FontAwesomeType = 'fas' | 'far' | 'fab' | 'fal' | 'fad';
export type IconType = 'fontAwesome' | 'image' | 'bank' | 'flag';

@Component({
  selector: 'fin-icon',
  imports: [CommonModule, MatTooltipModule, TranslateModule, NgOptimizedImage],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  public readonly icon = input<string>();
  public readonly fontAwesomeType = input<FontAwesomeType>('fas');
  public readonly type = input<IconType>('fontAwesome');
  public readonly imageFolder = input<string>('icons/');
  public readonly imageExtension = input<string>('.png');
  public readonly size = input<IconSize>('md');
  public readonly customSize = input<number | null>(null);
  public readonly iconColor = input<string>('#000000');
  public readonly boxColor = input<string>('transparent');
  public readonly boxRadius = input<number>(6);
  public readonly padding = input<number>(4);
  public readonly tooltip = input<string>('');
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
  private sizeMap: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '10xl': 120,
  };
  public readonly iconSize = computed(() => {
    return this.customSize() || this.sizeMap[this.size()];
  });
  public readonly containerSize = computed(() => {
    return this.iconSize() + this.padding() * 2;
  });
}
