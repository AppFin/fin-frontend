import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FinTextComponent } from "../text/fin-text.component";

@Component({
  selector: 'fin-side-modal-layout',
  imports: [ReactiveFormsModule, FinTextComponent],
  templateUrl: './side-modal-layout.component.html',
  styleUrl: './side-modal-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideModalLayoutComponent {
  public readonly formGroup = input.required<FormGroup>();
  public readonly title = input('');


}
