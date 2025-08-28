import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FinInputComponent } from '../../../../../shared/components/input/fin-input.component';
import { UserCreateForm } from '../../../models/user-create-form';
import { UserCreateService } from '../../../services/user-create.service';

@Component({
  selector: 'fin-auth-create-personal-step',
  imports: [FinButtonComponent, FinInputComponent],
  templateUrl: './auth-create-personal-step.component.html',
  styleUrl: './auth-create-personal-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreatePersonalStepComponent implements OnInit {
  public readonly creationToken = input<string>('');
  public readonly userCreated = output<void>();

  public readonly loading = signal(false);
  public readonly userCreateService = inject(UserCreateService);

  public form: FormGroup<UserCreateForm>;

  public ngOnInit(): void {
    this.createForm();
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.save();
  }

  public async save(): Promise<void> {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.form.disable();

    const form = this.form.getRawValue();
    const result = await this.userCreateService.createUser(
      this.creationToken(),
      form
    );

    if (result) {
      this.userCreated.emit();
    } else {
      this.form.enable();
    }

    this.loading.set(false);
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
