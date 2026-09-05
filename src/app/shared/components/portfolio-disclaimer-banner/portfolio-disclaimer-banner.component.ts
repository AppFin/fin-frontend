import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinIconComponent } from '../generics/icon/fin-icon.component';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';

@Component({
  selector: 'fin-portfolio-disclaimer-banner',
  imports: [FinIconComponent, FinTranslatePipe],
  templateUrl: './portfolio-disclaimer-banner.component.html',
  styleUrl: './portfolio-disclaimer-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioDisclaimerBannerComponent {}
