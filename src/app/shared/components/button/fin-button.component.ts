import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Button, ButtonLabel } from 'primeng/button';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { FinIconComponent } from '../icon/fin-icon.component';

export type FinButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'danger';
export type FinButtonVariant = 'text' | 'outlined' | undefined;

@Component({
  selector: 'fin-button',
  imports: [Button, FinTranslatePipe, ButtonLabel, FinIconComponent],
  templateUrl: './fin-button.component.html',
  styleUrl: './fin-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinButtonComponent {
  public readonly onClick = output<void>();

  public readonly text = input<string | null>(null);
  public readonly disabled = input(false);
  public readonly severity = input<FinButtonSeverity>('primary');
  public readonly variant = input<FinButtonVariant>(undefined);
  public readonly icon = input<string>('');

  public readonly isIconOnly = computed(() => this.icon() && !this.text());
  public readonly effectiveText = computed(() =>
    this.isIconOnly() ? '' : (this.text() ?? 'no text')
  );
}
