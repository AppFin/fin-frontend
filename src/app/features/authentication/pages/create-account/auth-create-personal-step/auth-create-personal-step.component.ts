import { ChangeDetectionStrategy, Component, OnInit, output, signal, } from '@angular/core';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FinInputComponent } from '../../../../../shared/components/input/fin-input.component';
import { UserCreateForm } from '../../../models/user-create-form';

@Component({
  selector: 'fin-auth-create-personal-step',
  imports: [FinButtonComponent, FinInputComponent],
  templateUrl: './auth-create-personal-step.component.html',
  styleUrl: './auth-create-personal-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreatePersonalStepComponent implements OnInit {
  public readonly userCreated = output<void>();

  public readonly loading = signal(false);

  public form: FormGroup<UserCreateForm>;

  public ngOnInit(): void {
    this.createForm();
  }

  public save(): void {
    if (this.form.invalid) return;

    this.loading.set(true);

    setTimeout(() => {
      this.userCreated.emit();
    }, 1500);
  }

  private createForm() {
    this.form = new FormGroup<UserCreateForm>({
      firstName: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      displayName: new FormControl(''),
    });
  }
}
