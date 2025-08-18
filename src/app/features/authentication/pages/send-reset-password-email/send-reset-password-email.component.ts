import { Component } from '@angular/core';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';

@Component({
  selector: 'fin-send-reset-password-email',
  imports: [FinTextComponent, FinIconComponent],
  templateUrl: './send-reset-password-email.component.html',
  styleUrl: './send-reset-password-email.component.scss',
})
export class SendResetPasswordEmailComponent {}
