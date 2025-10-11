import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  inject,
  input,
  Input,
  OnInit,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, firstValueFrom } from 'rxjs';
import { Select } from 'primeng/select';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { FinSelectComponentOptions } from './fin-select-component-options';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { FinSelectOptionWithTranslation } from './fin-select-option';
import { IftaLabel } from 'primeng/iftalabel';
import { FinIconComponent } from '../icon/fin-icon.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslateService } from '../../../../core/services/translate/fin-translate.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'fin-select',
  imports: [
    FormsModule,
    Select,
    ReactiveFormsModule,
    FinTranslatePipe,
    IftaLabel,
    FinIconComponent,
    MatProgressSpinnerModule,
    FinTextComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './fin-select.component.html',
  styleUrl: './fin-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinSelectComponent<T = any, C = null> implements OnInit {
  @Input() public formControl: FormControl<any>;

  public itemTemplateContent = contentChild<TemplateRef<any> | undefined>(
    'itemTemplate'
  );
  public selectedItemTemplateContent = contentChild<TemplateRef<any> | undefined>(
    'selectedItemTemplate'
  );

  public readonly label = input('');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly selectComponentOptions = input<FinSelectComponentOptions<T, C>>(
    undefined,
    { alias: 'options' }
  );

  public readonly id = input(
    `fin-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly loading = signal(true);
  public readonly options = signal<FinSelectOptionWithTranslation[]>([]);

  private readonly _hasError = signal(false);
  public readonly hasError = this._hasError.asReadonly();

  private _required = signal(false);
  public required = this._required.asReadonly();

  private _disabled = signal(false);
  public disabled = this._disabled.asReadonly();

  private readonly errorMessage = signal('');
  public readonly errorMessageEffective = computed(() => {
    return this.errorMessage() ?? this.customErrorText();
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly translationService = inject(FinTranslateService);

  public ngOnInit(): void {
    this.startRequiredSub();
    this.search();
  }

  public onBlur(): void {
    this.formControl.markAsTouched();
    this.validStatesChange();
  }

  public validStatesChange(): void {
    this.setRequired();
    this.setDisabled();
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

  private setDisabled(): void {
    this._disabled.set(this.formControl.disabled);
  }

  private setError(): void {
    const hasError =
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty);
    this._hasError.set(hasError);

    let errorMessage = '';

    if (!!this.formControl.errors) {
      const errors = this.formControl.errors;
      if (errors['required']) errorMessage = 'finCore.errors.required';
    }

    this.errorMessage.set(errorMessage);
  }

  private async search(): Promise<void> {
    const getOptions = this.selectComponentOptions()?.getOptions;
    if (!getOptions) throw new Error('options.getOptions must be provided');

    this.loading.set(true);
    const input = new PagedFilteredAndSortedInput();
    const options = await firstValueFrom(getOptions(input));
    this.options.set(
      options.items.map((e) => {
        return {
          labelTranslated: this.translationService.translate(e.label),
          ...e,
        } as FinSelectOptionWithTranslation;
      })
    );
    this.loading.set(false);
  }

  protected readonly onblur = onblur;
}
