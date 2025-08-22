import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fin-auth-create-finished-step',
  imports: [FinButtonComponent, FinIconComponent, RouterLink],
  templateUrl: './auth-create-finished-step.component.html',
  styleUrl: './auth-create-finished-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreateFinishedStepComponent {}
