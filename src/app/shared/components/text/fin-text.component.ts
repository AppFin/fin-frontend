import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';

export type FinTextType = 'label' | 'title' | 'subtitle' | 'paragraph' | 'info';
export type FinLinkTarget = '_self' | '_blank' | '_parent' | '_top';

@Component({
  selector: 'fin-text',
  templateUrl: './fin-text.component.html',
  styleUrl: './fin-text.component.scss',
  imports: [CommonModule, RouterLink, FinTranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinTextComponent {
  public readonly type = input<FinTextType>('paragraph');
  public readonly textColor = input('inherit');
  public readonly backgroundColor = input('transparent');
  public readonly text = input('');

  // Link Props
  public readonly href = input<string>();
  public readonly target = input<FinLinkTarget>('_self');
  public readonly routerLink = input<string | any[]>();
  public readonly rel = input<string>();

  // Label props
  public readonly for = input<string>();
}
