import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, firstValueFrom } from 'rxjs';
import { Select } from 'primeng/select';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { FinSelectComponentOptions } from './fin-select-component-options';
import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';
import { FinSelectOption } from './fin-select-option';

@Component({
  selector: 'fin-select',
  imports: [
    FloatLabel,
    FormsModule,
    Select,
    ReactiveFormsModule,
    FinTranslatePipe,
  ],
  templateUrl: './fin-select.component.html',
  styleUrl: './fin-select.component.scss',
})
export class FinSelectComponent implements OnInit {
  @Input() public formControl: FormControl<any>;

  public readonly label = input('');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly selectComponentOptions = input<FinSelectComponentOptions>(
    undefined,
    { alias: 'options' }
  );

  public readonly id = input(
    `fin-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly loading = signal(true);
  public readonly options = signal<FinSelectOption[]>([]);

  public readonly hasError = signal(false);

  private _required = signal(false);
  public required = this._required.asReadonly();

  private readonly errorMessage = signal('');
  public readonly errorMessageEffective = computed(() => {
    return this.errorMessage() ?? this.customErrorText();
  });

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startRequiredSub();
    this.search();
  }

  public validStatesChange(): void {
    this.setRequired();
    this.setError();
  }

  private startRequiredSub(): void {
    this.validStatesChange();
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
      .subscribe(() => {
        this.validStatesChange();
      });
  }

  private setRequired(): void {
    this._required.set(this.formControl.hasValidator(Validators.required));
  }

  private setError(): void {
    const hasError =
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty);
    this.hasError.set(hasError);

    let errorMessage = '';

    if (!!this.formControl.errors) {
      const errors = this.formControl.errors;
      if (errors['required']) errorMessage = 'fin-core.errors.required';
    }

    this.errorMessage.set(errorMessage);
  }

  private async search(): Promise<void> {
    const getOptions = this.selectComponentOptions()?.getOptions;
    if (!getOptions) throw new Error('options.getOptions must be provided');

    this.loading.set(true);
    const input = new PagedFilteredAndSortedInput();
    const options = await firstValueFrom(getOptions(input));
    this.options.set(options.items);
    this.loading.set(false);
  }
}
