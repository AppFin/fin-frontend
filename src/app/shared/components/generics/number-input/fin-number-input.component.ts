import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinInputComponent } from './fin-input.component';

@Component({
  selector: 'fin-number-input',
  imports: [FinInputComponent],
  template: `
    <fin-input
      [formControl]="formControl"
      [label]="label()"
      type="number"
      [min]="min()"
      [max]="max()"
      [readonly]="readonly()"
      [customErrorText]="customErrorText()"
      [helpText]="helpText()"
      [id]="id()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinNumberInputComponent {
  @Input() public formControl: FormControl<number | null>;

  public readonly label = input<string>();
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly min = input<number>();
  public readonly max = input<number>();
  public readonly id = input(
    `fin-number-input-${Math.random().toString(36).substring(2, 9)}`
  );
}
