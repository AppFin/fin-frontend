import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

export type TextType = 'label' | 'title' | 'subtitle' | 'paragraph' | 'info';
export type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

@Component({
  selector: 'fin-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  imports: [CommonModule, TranslatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  public readonly type = input<TextType>('paragraph');
  public readonly textColor = input('inherit');
  public readonly backgroundColor = input('transparent');
  public readonly text = input('');

  // Link Props
  public readonly href = input<string>();
  public readonly target = input<LinkTarget>('_self');
  public readonly routerLink = input<string | any[]>();
  public readonly rel = input<string>();
}
