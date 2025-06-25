import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'fin-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    TranslatePipe,
    TextComponent,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  @Input() public formControl: FormControl<string | null>;
  public readonly label = input('');
  public readonly type = input('text');
  public readonly errorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly readonly = input(false);
  public readonly id = input(
    `fin-input-${Math.random().toString(36).substring(2, 9)}`
  );

  // public readonly readonly = input(false);
  // public readonly mask = input('');

  // public readonly iconPrefix = input('');
  // public readonly iconSuffix = input('');
  // public readonly prefixTemplate =
  //   input<TemplateRef<FinInputTemplateContext>>();
  // public readonly suffixTemplate =
  //   input<TemplateRef<FinInputTemplateContext>>();

  public readonly hasError = signal(false);
  public readonly errorMessage = signal('');

  private _required = signal(false);
  public required = this._required.asReadonly();

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startRequiredSub();
  }

  private startRequiredSub(): void {
    this.setRequired();
    this.setError();
    this.formControl.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
      .subscribe(() => {
        this.setRequired();
        this.setError();
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
      if (errors['required']) errorMessage = 'Este campo é obrigatório';
      if (errors['email']) errorMessage = 'Email inválido';
      if (errors['minlength'])
        errorMessage = `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
      if (errors['maxlength'])
        errorMessage = `Máximo de ${errors['maxlength'].requiredLength} caracteres`;
      if (errors['pattern']) errorMessage = 'Formato inválido';
    }

    if (!errorMessage) errorMessage = this.errorText() ?? 'Campo inválido';
    this.errorMessage.set(errorMessage);
  }
}
