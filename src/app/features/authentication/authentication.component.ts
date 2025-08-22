import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinTextComponent } from '../../shared/components/text/fin-text.component';

@Component({
  selector: 'fin-authentication',
  imports: [RouterOutlet, FinTextComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {}
