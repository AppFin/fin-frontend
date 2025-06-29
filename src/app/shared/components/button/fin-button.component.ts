import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Button } from 'primeng/button';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';

@Component({
  selector: 'fin-button',
  imports: [Button, FinTranslatePipe],
  templateUrl: './fin-button.component.html',
  styleUrl: './fin-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinButtonComponent {
  public readonly text = input('no-text');
  public readonly disabled = input(false);
  public readonly onClick = output<void>();
}
