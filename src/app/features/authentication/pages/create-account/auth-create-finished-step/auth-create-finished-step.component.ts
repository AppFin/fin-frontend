import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  output,
  signal,
} from '@angular/core';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';

@Component({
  selector: 'fin-auth-create-finished-step',
  imports: [FinButtonComponent, FinIconComponent],
  templateUrl: './auth-create-finished-step.component.html',
  styleUrl: './auth-create-finished-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreateFinishedStepComponent {
  public readonly login = output();
  public readonly loading = signal(false);

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.finish();
  }

  public finish(): void {
    this.loading.set(true);
    this.login.emit();
  }
}
