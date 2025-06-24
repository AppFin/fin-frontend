import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export type TextType = 'label' | 'title' | 'subtitle' | 'paragraph' | 'info';

@Component({
  selector: 'fin-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  imports: [CommonModule, TranslatePipe],
})
export class TextComponent {
  public readonly type = input<TextType>('paragraph');
  public readonly textColor = input('inherit');
  public readonly backgroundColor = input('transparent');
  public readonly text = input('');
}
