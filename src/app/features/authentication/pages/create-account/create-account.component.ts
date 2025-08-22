import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { StepperModule } from 'primeng/stepper';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthCreateFinishedStepComponent } from './auth-create-finished-step/auth-create-finished-step.component';
import { AuthCreatePersonalStepComponent } from './auth-create-personal-step/auth-create-personal-step.component';
import { AuthCreateCredentialStepComponent } from './auth-create-credential-step/auth-create-credential-step.component';

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

  public readonly steps = CreateAccountSteps;

  public setCreateToken(creationToken: string) {
    this.creationToken.set(creationToken);
    this.currentStep.set(CreateAccountSteps.Personal);
  }

  public setUserCreated(): void {
    this.currentStep.set(CreateAccountSteps.Finished);
  }
}
