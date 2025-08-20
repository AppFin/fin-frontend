import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'fin-create-account',
  imports: [FinIconComponent, FinTextComponent, TabsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateAccountComponent {}
