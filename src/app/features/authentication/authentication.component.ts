import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinTextComponent } from '../../shared/components/generics/text/fin-text.component';
import { PortfolioDisclaimerBannerComponent } from '../../shared/components/portfolio-disclaimer-banner/portfolio-disclaimer-banner.component';

@Component({
  selector: 'fin-authentication',
  imports: [RouterOutlet, FinTextComponent, PortfolioDisclaimerBannerComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {}
