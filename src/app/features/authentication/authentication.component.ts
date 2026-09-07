import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioDisclaimerBannerComponent } from '../../shared/components/portfolio-disclaimer-banner/portfolio-disclaimer-banner.component';

@Component({
  selector: 'fin-authentication',
  imports: [RouterOutlet, PortfolioDisclaimerBannerComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {}
