import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FinTextComponent } from '../../../../shared/components/generics/text/fin-text.component';
import { StepperModule } from 'primeng/stepper';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthCreateFinishedStepComponent } from './auth-create-finished-step/auth-create-finished-step.component';
import { AuthCreatePersonalStepComponent } from './auth-create-personal-step/auth-create-personal-step.component';
import { AuthCreateCredentialStepComponent } from './auth-create-credential-step/auth-create-credential-step.component';
import { UserCreationStatedDto } from '../../models/user-creation-stated-dto';
import { AuthService } from '../../../../core/services/authentication/auth.service';

enum CreateAccountSteps {
  Credential = 1,
  Personal = 2,
  Finished = 3,
}

@Component({
  selector: 'fin-create-account',
  imports: [
    FinTextComponent,
    StepperModule,
    TranslatePipe,
    AuthCreateFinishedStepComponent,
    AuthCreatePersonalStepComponent,
    AuthCreateCredentialStepComponent,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent {
  public readonly creationToken = signal<string>('');
  public readonly currentStep = signal(CreateAccountSteps.Credential);
  public readonly credentialDto = signal<UserCreationStatedDto | null>(null);

  public readonly steps = CreateAccountSteps;
  public readonly authService = inject(AuthService);

  public setStartedCreate(dto: UserCreationStatedDto) {
    this.creationToken.set(dto.creationToken);
    this.credentialDto.set(dto);
    this.currentStep.set(CreateAccountSteps.Personal);
  }

  public setUserCreated(): void {
    this.currentStep.set(CreateAccountSteps.Finished);
  }

  public async loginPosCreated(): Promise<void> {
    if (!this.credentialDto()) return;

    await this.authService.login({
      password: this.credentialDto()?.password ?? '',
      email: this.credentialDto()?.email ?? '',
    });
  }
}
