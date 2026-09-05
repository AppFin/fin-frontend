import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { FinTextComponent } from '../text/fin-text.component';

@Component({
  selector: 'fin-date-input',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    FinTextComponent,
    FinTranslatePipe,
    IftaLabelModule,
    DatePickerModule,
  ],
  template: `
    <div class="fin-date-input-wrapper">
      <p-floatlabel>
        <p-datepicker
          #datePicker
          [formControl]="formControl"
          dateFormat="yy-mm-dd"
          [showIcon]="true"
          [fluid]="true"
          appendTo="body"
        />
        <label>{{ label() | finTranslate }}</label>
      </p-floatlabel>
      @if (formControl?.hasError('required') && formControl?.touched) {
        <fin-text
          type="caption"
          [text]="'validation.required' | finTranslate"
          [severity]="'error'"
        />
      }
    </div>
  `,
  styleUrl: './fin-date-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinDateInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinDateInputComponent implements ControlValueAccessor {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input<string>();
  public readonly readonly = input(false);

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
