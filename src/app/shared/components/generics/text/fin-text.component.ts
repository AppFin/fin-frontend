import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { FinSeverity } from '../../../../core/types/themes/fin-severity';
import { finSeverityConverter } from '../../../../core/functions/fin-severity-converter';
import { MatTooltipModule } from '@angular/material/tooltip';

export type FinTextType = 'label' | 'title' | 'subtitle' | 'paragraph' | 'subparagraph' | 'info';
export type FinLinkTarget = '_self' | '_blank' | '_parent' | '_top';

@Component({
  selector: 'fin-text',
  templateUrl: './fin-text.component.html',
  styleUrl: './fin-text.component.scss',
  imports: [CommonModule, RouterLink, FinTranslatePipe, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinTextComponent {
  public readonly type = input<FinTextType>('paragraph');
  public readonly textColor = input('');
  public readonly backgroundColor = input('transparent');
  public readonly text = input('');
  public readonly severity = input<FinSeverity | null>(null);
  public readonly fixedSize = input(true);
  public readonly tooltip = input('');

  // Link Props
  public readonly href = input<string>();
  public readonly target = input<FinLinkTarget>('_self');
  public readonly routerLink = input<string | any[]>();
  public readonly rel = input<string>();

  // Click Props
  public readonly onClick = input<(ev: MouseEvent) => void>();
  public readonly disabledClick = input<boolean>();

  // Label props
  public readonly for = input<string>();

  public readonly textEffectiveColor = computed(() => {
    if (this.textColor()) return this.textColor();
    const severity = this.severity();
    if (severity !== null) return finSeverityConverter(severity);
    return 'inherit';
  });

  public clicked(ev: MouseEvent): void {
    if (!this.onClick() || this.disabledClick()) return;
    ev.preventDefault();
    this.onClick()?.(ev);
  }
}
