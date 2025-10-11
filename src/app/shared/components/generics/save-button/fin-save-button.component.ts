import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import { FinButtonComponent } from '../button/fin-button.component';

@Component({
  selector: 'fin-save-button',
  imports: [FinButtonComponent],
  templateUrl: './fin-save-button.component.html',
  styleUrl: './fin-save-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinSaveButtonComponent {
  public saving = input(false);
  public canSave = input(false);
  public onSave = output();
}
